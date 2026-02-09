# Chromecast Device Emulator — Technical Specification

> **Version:** 1.2.7  
> **License:** MIT  
> **Runtime:** Node.js >= 6.9.0

---

## 1. Overview

Chromecast Device Emulator (CDE) is a development tool that emulates the IPC (inter-process communication) layer of a Google Cast device. It replays pre-recorded WebSocket messages to a Chromecast receiver app running in a local browser, removing the need for a physical Cast device during development.

The project ships two primary artifacts:

| Artifact | Target | Entry Point | Build |
|---|---|---|---|
| **Node module / CLI** | Node.js (server-side) | `dist/index.js` / `dist/cli/index.js` | Babel (`src/` → `dist/`, ignoring `receiver-utils/`) |
| **Receiver Utilities** | Browser (client-side) | `dist/receiver-utils.min.js` | Browserify + Babelify (`src/receiver-utils/index.js` → bundle) |

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Developer Machine                     │
│                                                         │
│  ┌──────────────┐   WebSocket (ws://localhost:8008)     │
│  │  CDE Server  │◄────────────────────────────────────┐ │
│  │  (Node.js)   │   path: /v2/ipc                     │ │
│  └──────┬───────┘                                     │ │
│         │ replays IPC messages                        │ │
│         │ per timeline schedule                       │ │
│         ▼                                             │ │
│  ┌──────────────┐                              ┌──────┴─┐
│  │  Scenario    │                              │Receiver │
│  │  JSON file   │                              │  App    │
│  └──────────────┘                              │(Browser)│
│                                                └─────────┘
│                                                         │
├─────────────────────────────────────────────────────────┤
│                Physical Cast Device (recording only)     │
│                                                         │
│  ┌──────────────┐   WebSocket (native)                  │
│  │  Cast Sender │──────────────────────────────────────►│
│  │  (App)       │                              ┌────────┤
│  └──────────────┘                              │Receiver │
│                                                │  App +  │
│                                                │receiver-│
│                                                │ utils   │
│                                                └─────────┘
└─────────────────────────────────────────────────────────┘
```

### 2.1 Communication Protocol

- **Transport:** WebSocket (`ws` npm package)
- **Host:** `localhost`
- **Port:** `8008` (hard-coded in `serverConfig`)
- **Path:** `/v2/ipc`
- **Message format:** Stringified JSON conforming to the IPC Message schema (see §5.2)

### 2.2 Message Flow (Emulation Mode)

1. CDE server starts and loads a scenario JSON file.
2. Receiver app connects to `ws://localhost:8008/v2/ipc`.
3. On connection, the server schedules a `setTimeout` for each message in `timeline`, using the `time` field as the delay.
4. Messages are sent to the client at their scheduled times, simulating the original sender-receiver conversation.
5. Any messages sent from the receiver back to the server are logged to stdout.

### 2.3 Message Flow (Recording Mode)

1. The `receiver-utils.min.js` script is injected into the receiver app HTML before Cast SDKs.
2. `device-polyfill` sets up `window.cast.__platform__` to force WebSocket-based IPC.
3. `scenario-recorder` monkey-patches `WebSocket.prototype.send` to intercept outgoing calls and attach a `message` listener on the first send.
4. Every incoming message is pushed to an in-memory queue with an elapsed-time timestamp.
5. The developer calls `CDE.exportScenario()` in DevTools to print the queue as a scenario JSON string.

---

## 3. Module Inventory

### 3.1 `src/index.js` — CastDeviceEmulator class

The core module. Exports the `CastDeviceEmulator` class.

#### Constructor

```
new CastDeviceEmulator([options])
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `options.silent` | `boolean` | `false` | When `true`, suppresses all console output. |

#### Instance Properties

| Property | Type | Description |
|---|---|---|
| `options` | `Object` | Constructor options |
| `wss` | `WebSocket.Server \| null` | The `ws` server instance; `null` until `start()` is called |
| `recordedMessages` | `Array<{time, ipcMessage}>` | The loaded scenario timeline entries |

#### Public Methods

| Method | Signature | Description |
|---|---|---|
| `loadScenario` | `(scenarioFile: Object) → void` | Validates `scenarioFile` against `schemas/scenario.json` using Ajv. Throws `Error` on invalid schema. Sets `this.recordedMessages` to `scenarioFile.timeline`. |
| `start` | `(callback?: Function) → void` | Creates a `WebSocket.Server` on port 8008, path `/v2/ipc`. Registers connection handler. Invokes `callback` once listening. |
| `stop` | `() → void` | Removes `message` and `connection` listeners from the WebSocket server. Does **not** close the server. |
| `close` | `(callback?: Function) → void` | Closes the WebSocket server. Invokes `callback` after shutdown. No-ops if `wss` is `null`. |

#### Private Methods

| Method | Description |
|---|---|
| `_webSocketConnectionHandler(ws)` | Called per new connection. Attaches message handler to the socket, then iterates `recordedMessages` and schedules each via `setTimeout(fn, m.time)`. Only sends if `ws.readyState === WebSocket.OPEN`. |
| `_webSocketMessageHandler(message)` | Logs incoming messages from the receiver app to stdout (prefixed with green `<<`). |

#### Dependencies

| Package | Usage |
|---|---|
| `ws` (^5.2.0) | WebSocket server implementation |
| `ajv` (^4.11.8) | JSON Schema validation (draft-04) |
| `chalk` (^2.4.1) | Colored console output for message direction indicators |

---

### 3.2 `src/log.js` — Logging Utility

Provides namespaced console output functions. All messages are prefixed with `"chromecast-device-emulator:"`.

| Export | Maps to |
|---|---|
| `log(...params)` | `console.log` |
| `warn(...params)` | `console.warn` |
| `error(...params)` | `console.error` |

---

### 3.3 `src/cli/index.js` — CLI Entry Point

Shebang-executable Node script. Registers the CLI using `commander`.

| Detail | Value |
|---|---|
| Binary names | `chromecast-device-emulator`, `cde` |
| Version flag | `-v, --version` |
| Subcommand | `start <filepath>` |
| Default behavior (no args) | Prints help |

#### Flow

1. Parses `process.argv` via `commander`.
2. Delegates `start` command to `cli/app.js → startEmulator()`.

---

### 3.4 `src/cli/app.js` — CLI Application Logic

#### `startEmulator(filepath, cmd)`

1. Resolves `filepath` relative to `process.cwd()`.
2. Instantiates `CastDeviceEmulator`.
3. Calls `loadScenario()` with the required JSON file.
4. Calls `start()` to launch the WebSocket server.
5. Errors are caught and printed via `error()`.

> **Note:** The server runs indefinitely (no signal handling or graceful shutdown is implemented in the CLI).

---

### 3.5 `src/receiver-utils/index.js` — Receiver Utilities Entry

Browser bundle entry point. Loads two sub-modules in order:

1. `device-polyfill`
2. `scenario-recorder`

Built into `dist/receiver-utils.min.js` via Browserify with Babelify transform and the `minify` preset.

---

### 3.6 `src/receiver-utils/device-polyfill.js` — Cast Platform Polyfill

An IIFE that runs in the browser context.

**Purpose:** Ensures `window.cast.__platform__` exists. On a real Cast device this object is provided natively; on a non-Cast browser, this polyfill creates it so the Cast SDK falls back to WebSocket-based IPC rather than using the native platform bridge.

**Behavior:**

```javascript
window.cast = window.cast || {};
window.cast.__platform__ = {};
```

This tricks the Cast SDK into treating the environment as a Cast device and communicating over WebSocket, which the emulator (or recorder) can intercept.

---

### 3.7 `src/receiver-utils/scenario-recorder.js` — IPC Message Recorder

An IIFE that runs in the browser context. Provides the recording capabilities.

#### Mechanism

1. **WebSocket Monkey-Patch:**
   - Saves `WebSocket.prototype.send` as `realSendFunc`.
   - Replaces `send` with a wrapper that:
     - Calls `realSendFunc(data)` (sends normally).
     - Attaches a one-time `message` event listener to capture incoming messages.
     - Replaces `this.send` with a direct passthrough for subsequent calls (avoids re-attaching listeners).

2. **Message Queue:**
   - Records `startup` timestamp on module load.
   - `pushMessage(message)` computes elapsed time (`Date.now() - startup`) and pushes `{ time, ipcMessage }` to an in-memory `messageQueue` array.

3. **Export API:**
   - Exposes `window.CDE.exportScenario([clearConsole])`.
   - `clearConsole` defaults to `true`.
   - Serializes `{ timeline: messageQueue }` as JSON and prints to console.

#### Limitations

- The monkey-patch only intercepts messages received *after* the first `send()` call on each WebSocket instance.
- Recording captures **incoming** messages (from sender to receiver), not outgoing ones.

---

## 4. CLI Specification

```
chromecast-device-emulator [options] [command]

Options:
  -v, --version              Output the version number
  -h, --help                 Output usage information

Commands:
  start <filepath>           Start a chromecast-device-emulator server
                             that serves with given scenario
```

| Aspect | Detail |
|---|---|
| Scenario file resolution | `path.resolve(process.cwd(), filepath)` — supports relative and absolute paths |
| Server port | 8008 (fixed) |
| Server path | `/v2/ipc` (fixed) |
| Exit behavior | Runs until process is killed (no `SIGINT`/`SIGTERM` handler) |

---

## 5. Data Schemas

### 5.1 Scenario Schema (`schemas/scenario.json`)

JSON Schema Draft-04.

```jsonc
{
  "type": "object",
  "required": ["timeline"],
  "properties": {
    "timeline": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["ipcMessage", "time"],
        "properties": {
          "time":       { "type": "integer" },
          "ipcMessage": { "type": "string"  }
        }
      }
    }
  }
}
```

| Field | Type | Constraints | Description |
|---|---|---|---|
| `timeline` | `array` | Required, top-level | Ordered sequence of IPC events |
| `timeline[].time` | `integer` | Required | Milliseconds from session start; used as `setTimeout` delay |
| `timeline[].ipcMessage` | `string` | Required | Stringified JSON payload of the IPC message |

### 5.2 IPC Message Schema (`schemas/ipc-message.json`)

JSON Schema Draft-04. Describes the structure of each `ipcMessage` value after parsing.

```jsonc
{
  "type": "object",
  "required": ["data", "namespace", "senderId"],
  "properties": {
    "data":      { "type": "string" },
    "namespace": { "type": "string" },
    "senderId":  { "type": "string" }
  }
}
```

| Field | Type | Description |
|---|---|---|
| `data` | `string` | Double-encoded JSON string containing the actual message payload (e.g., media commands, system events) |
| `namespace` | `string` | Cast namespace URI (e.g., `urn:x-cast:com.google.cast.media`, `urn:x-cast:com.google.cast.system`) |
| `senderId` | `string` | Identifier of the sender (e.g., `"SystemSender"`, or a sender-specific UUID) |

#### Common Namespaces

| Namespace | Purpose |
|---|---|
| `urn:x-cast:com.google.cast.system` | System events: `ready`, `volumechanged`, `visibilitychanged`, `standbychanged`, `senderconnected`, `hdroutputtypechanged` |
| `urn:x-cast:com.google.cast.media` | Media control: `GET_STATUS`, `LOAD`, `QUEUE_LOAD`, `QUEUE_UPDATE`, `SEEK`, `PAUSE`, `PLAY` |
| `urn:x-cast:com.google.cast.cac` | CAC events: `FOCUS_STATE` |

---

## 6. Build System

### 6.1 npm Scripts

| Script | Command | Description |
|---|---|---|
| `build` | `babel src --ignore receiver-utils --out-dir dist` | Transpiles server-side code (Node module + CLI) from `src/` to `dist/`, excluding `receiver-utils/` |
| `build:receiver-utils` | `NODE_ENV=production browserify --transform babelify src/receiver-utils/index.js --outfile dist/receiver-utils.min.js` | Bundles browser-side receiver utilities into a single minified file |
| `pretest` | `npm run build` | Auto-builds before running tests |
| `test` | `mocha "dist/**/*.spec.js"` | Runs Mocha test suite against transpiled output |

### 6.2 Babel Configuration

| Concern | Package |
|---|---|
| Transpiler | `babel-cli` ^6.26.0, `babel-core` ^6.26.3 |
| ES2015+ → Node-compatible | `babel-preset-env` ^1.7.0 |
| Inline `process.env.NODE_ENV` | `babel-plugin-transform-node-env-inline` ^0.4.3 |
| Minification (receiver-utils only) | `babel-preset-minify` ^0.4.3 |
| Browserify transform | `babelify` ^8.0.0 |

### 6.3 Distribution Layout

```
dist/
├── index.js                  # CastDeviceEmulator class (Node)
├── index.spec.js             # Test file (transpiled)
├── log.js                    # Logging utility (transpiled)
├── cli/
│   ├── index.js              # CLI entry point (with shebang)
│   └── app.js                # CLI application logic
└── receiver-utils.min.js     # Browser bundle (Browserify output)
```

### 6.4 Package Exports

```jsonc
{
  "main": "dist/index.js",
  "bin": {
    "chromecast-device-emulator": "./dist/cli/index.js",
    "cde": "./dist/cli/index.js"
  }
}
```

---

## 7. Test Specification

**Framework:** Mocha ^3.5.3 + Chai ^3.5.0  
**Location:** `src/index.spec.js` → `dist/index.spec.js`

### Test Suites

#### 7.1 Methods Existence

| Test | Assertion |
|---|---|
| Should have expected public methods | `CastDeviceEmulator` responds to `loadScenario`, `start`, `stop` |

#### 7.2 `.loadScenario()`

| Test | Assertion |
|---|---|
| Should fail when input doesn't fit JSON schema | Passing an object with `notATimeline` instead of `timeline` throws `Error` |

#### 7.3 `.close()`

| Test | Assertion |
|---|---|
| Should close WebSocket server properly | Two emulators can start and close sequentially (verifies port 8008 is released) |

Timeout: 30 seconds.

#### 7.4 WebSocket Basic Operations

| Test | Assertion |
|---|---|
| Should respond to WebSocket client connection | A `ws` client connects to `ws://localhost:8008/v2/ipc`, sends bootstrap messages (`READY`, `START_HEARTBEAT`, `MEDIA_STATUS`), receives replayed scenario messages, and validates each against `schemas/ipc-message.json`. Test completes when a `QUEUE_LOAD` message is received. |

Timeout: 30 seconds.

---

## 8. Dependencies

### Runtime

| Package | Version | Purpose |
|---|---|---|
| `ws` | ^5.2.0 | WebSocket server implementation |
| `ajv` | ^4.11.8 | JSON Schema (draft-04) validation |
| `chalk` | ^2.4.1 | Terminal string styling for log output |
| `commander` | ^2.15.1 | CLI argument parsing |

### Development

| Package | Version | Purpose |
|---|---|---|
| `babel-cli` | ^6.26.0 | Babel command-line transpiler |
| `babel-core` | ^6.26.3 | Babel core |
| `babel-preset-env` | ^1.7.0 | Smart ES2015+ preset |
| `babel-preset-minify` | ^0.4.3 | Code minification for browser bundle |
| `babel-plugin-transform-node-env-inline` | ^0.4.3 | Inlines `NODE_ENV` at build time |
| `babelify` | ^8.0.0 | Babel transform for Browserify |
| `browserify` | ^16.2.2 | Browser module bundler |
| `mocha` | ^3.5.3 | Test runner |
| `chai` | ^3.5.0 | Assertion library |

---

## 9. Known Limitations & Technical Debt

| Item | Details |
|---|---|
| **Hard-coded port** | Port `8008` is not configurable via options or CLI flags. |
| **Hard-coded path** | WebSocket path `/v2/ipc` is not configurable. |
| **No graceful shutdown in CLI** | The CLI `start` command has no `SIGINT`/`SIGTERM` signal handling; the process must be killed manually. |
| **Timer-based replay** | Each message is scheduled via independent `setTimeout` calls on connection. Timers are not cancelled on disconnect or `stop()`, which can cause "send on closed socket" attempts (guarded by `readyState` check). |
| **No bidirectional simulation** | The emulator only replays server→client messages. It does not respond dynamically to client messages (receiver → sender responses like `MEDIA_STATUS` replies). |
| **`stop()` vs `close()` semantics** | `stop()` removes listeners but leaves the server running. `close()` shuts down the server. There is no way to "pause and resume" replay. |
| **Recorder captures incoming only** | `scenario-recorder` records messages *received* by the receiver, not messages *sent* by the receiver. |
| **FIXME in source** | `_webSocketConnectionHandler` has a `// FIXME: Validate format before send it` comment — no per-message validation is performed before replay. |
| **Callback-based API** | `start()` and `close()` use callbacks instead of Promises. |
| **Legacy Babel 6** | The project uses Babel 6.x, which is unmaintained. |

---

## 10. Test Fixture Requirements

The acceptance/integration tests depend on a valid scenario JSON containing specific message types.

### Minimum Viable Scenario

A test fixture must contain at minimum:

1. A `ready` system event (namespace: `urn:x-cast:com.google.cast.system`, senderId: `SystemSender`)
2. A `volumechanged` system event
3. A `senderconnected` system event
4. A `GET_STATUS` media request (namespace: `urn:x-cast:com.google.cast.media`)
5. A `QUEUE_LOAD` or `LOAD` media command — **required for the WebSocket round-trip test to complete**

Timeline entries should be ordered by ascending `time` values with reasonable spacing (e.g., 100–500ms) for timing tests.

### Reference Fixture

See `examples/scenarios/example.json` — this is the canonical test fixture used by the original test suite. Key characteristics:
- 9 timeline entries spanning 12250ms to 20981ms
- Contains message types: `ready`, `volumechanged`, `visibilitychanged`, `standbychanged`, `hdroutputtypechanged`, `senderconnected`, `GET_STATUS`, `QUEUE_LOAD`, `QUEUE_UPDATE`
- The `QUEUE_LOAD` message at `time: 13951` is the trigger that completes the WebSocket test

---

## 11. Acceptance Test Contract

An implementation is considered functionally equivalent if it passes all acceptance tests defined in `tests/acceptance.test.mjs`. These tests are **implementation-independent** — they only exercise:

1. The public API surface of the default export (`loadScenario`, `start`, `stop`, `close`)
2. WebSocket server behavior at `ws://localhost:8008/v2/ipc`
3. JSON Schema validation using the schema files in `schemas/`
4. CLI binary registration (`chromecast-device-emulator`, `cde`)

Run with: `node --test tests/acceptance.test.mjs`
