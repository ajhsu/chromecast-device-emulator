/**
 * Acceptance Test Suite for Chromecast Device Emulator
 *
 * These tests are implementation-independent. They exercise only the public
 * API surface and observable WebSocket behavior, so they can verify functional
 * equivalence between the original project and any re-implementation.
 *
 * Requirements:
 *   - Node.js >= 20
 *   - `ws` package installed (used as WebSocket client)
 *   - The package's default export must be the CastDeviceEmulator class
 *   - Schema files must exist at `schemas/scenario.json` and `schemas/ipc-message.json`
 *
 * Run:  node --test tests/acceptance.test.mjs
 */

import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// --- Load the module under test (supports both CJS default export patterns) ---
const CastDeviceEmulator = require(ROOT);

// --- Load WebSocket client ---
const WebSocket = require('ws');

// --- Load test fixtures ---
const validScenario = JSON.parse(
  readFileSync(resolve(__dirname, 'fixtures/valid-scenario.json'), 'utf-8')
);
const exampleScenario = JSON.parse(
  readFileSync(resolve(ROOT, 'examples/scenarios/example.json'), 'utf-8')
);

// --- Load schemas for validation ---
const scenarioSchema = JSON.parse(
  readFileSync(resolve(ROOT, 'schemas/scenario.json'), 'utf-8')
);
const ipcMessageSchema = JSON.parse(
  readFileSync(resolve(ROOT, 'schemas/ipc-message.json'), 'utf-8')
);

// --- Ajv for schema validation within tests ---
const Ajv = require('ajv');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Promisified wrapper: start emulator and resolve when listening */
function startEmulator(emulator) {
  return new Promise((resolve) => emulator.start(() => resolve()));
}

/** Promisified wrapper: close emulator and resolve when done */
function closeEmulator(emulator) {
  return new Promise((resolve) => emulator.close(() => resolve()));
}

/** Connect a WebSocket client and resolve when open */
function connectClient(url = 'ws://localhost:8008/v2/ipc') {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    ws.on('open', () => resolve(ws));
    ws.on('error', reject);
  });
}

/** Collect N messages from a WebSocket client */
function collectMessages(ws, count) {
  return new Promise((resolve) => {
    const messages = [];
    ws.on('message', (data) => {
      messages.push(typeof data === 'string' ? data : data.toString());
      if (messages.length >= count) resolve(messages);
    });
  });
}

/** Collect messages until a predicate is met */
function collectUntil(ws, predicate, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const messages = [];
    const timer = setTimeout(
      () => reject(new Error(`Timed out after ${timeoutMs}ms waiting for predicate`)),
      timeoutMs
    );
    ws.on('message', (data) => {
      const str = typeof data === 'string' ? data : data.toString();
      messages.push(str);
      if (predicate(str, messages)) {
        clearTimeout(timer);
        resolve(messages);
      }
    });
  });
}

/** Small delay helper */
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ===========================================================================
//  1. API SURFACE
// ===========================================================================

describe('1. API Surface', () => {
  it('1.1 default export is a constructor function', () => {
    assert.equal(typeof CastDeviceEmulator, 'function');
  });

  it('1.2 constructor creates an instance without arguments', () => {
    const emulator = new CastDeviceEmulator();
    assert.ok(emulator instanceof CastDeviceEmulator);
  });

  it('1.3 constructor accepts an options object', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.ok(emulator instanceof CastDeviceEmulator);
  });

  it('1.4 instance exposes loadScenario method', () => {
    const emulator = new CastDeviceEmulator();
    assert.equal(typeof emulator.loadScenario, 'function');
  });

  it('1.5 instance exposes start method', () => {
    const emulator = new CastDeviceEmulator();
    assert.equal(typeof emulator.start, 'function');
  });

  it('1.6 instance exposes stop method', () => {
    const emulator = new CastDeviceEmulator();
    assert.equal(typeof emulator.stop, 'function');
  });

  it('1.7 instance exposes close method', () => {
    const emulator = new CastDeviceEmulator();
    assert.equal(typeof emulator.close, 'function');
  });
});

// ===========================================================================
//  2. SCHEMA VALIDATION
// ===========================================================================

describe('2. Schema Validation', () => {
  it('2.1 loadScenario accepts a valid scenario object', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.doesNotThrow(() => emulator.loadScenario(validScenario));
  });

  it('2.2 loadScenario accepts the example scenario', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.doesNotThrow(() => emulator.loadScenario(exampleScenario));
  });

  it('2.3 loadScenario rejects object without timeline property', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.throws(
      () => emulator.loadScenario({ notTimeline: [] }),
      /invalid|schema/i
    );
  });

  it('2.4 loadScenario rejects timeline items missing time', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.throws(
      () =>
        emulator.loadScenario({
          timeline: [{ ipcMessage: '{}' }],
        }),
      /invalid|schema/i
    );
  });

  it('2.5 loadScenario rejects timeline items missing ipcMessage', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.throws(
      () =>
        emulator.loadScenario({
          timeline: [{ time: 100 }],
        }),
      /invalid|schema/i
    );
  });

  it('2.6 loadScenario rejects non-integer time values', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.throws(
      () =>
        emulator.loadScenario({
          timeline: [{ time: 1.5, ipcMessage: '{}' }],
        }),
      /invalid|schema/i
    );
  });

  it('2.7 loadScenario rejects non-string ipcMessage', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.throws(
      () =>
        emulator.loadScenario({
          timeline: [{ time: 100, ipcMessage: 123 }],
        }),
      /invalid|schema/i
    );
  });

  it('2.8 loadScenario accepts empty timeline', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.doesNotThrow(() => emulator.loadScenario({ timeline: [] }));
  });

  it('2.9 loadScenario rejects completely empty object', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    assert.throws(() => emulator.loadScenario({}), /invalid|schema/i);
  });
});

// ===========================================================================
//  3. SERVER LIFECYCLE
// ===========================================================================

describe('3. Server Lifecycle', () => {
  it('3.1 start() opens a WebSocket server on port 8008', async () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario({ timeline: [] });
    await startEmulator(emulator);

    // Verify we can connect
    const ws = await connectClient();
    assert.equal(ws.readyState, WebSocket.OPEN);
    ws.close();

    await closeEmulator(emulator);
  });

  it('3.2 close() shuts down the server and frees the port', async () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario({ timeline: [] });
    await startEmulator(emulator);
    await closeEmulator(emulator);

    // Port should be free — start a second emulator
    const emulator2 = new CastDeviceEmulator({ silent: true });
    emulator2.loadScenario({ timeline: [] });
    await startEmulator(emulator2);

    const ws = await connectClient();
    assert.equal(ws.readyState, WebSocket.OPEN);
    ws.close();

    await closeEmulator(emulator2);
  });

  it('3.3 start() invokes callback when server is ready', async () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario({ timeline: [] });

    let callbackCalled = false;
    await new Promise((resolve) => {
      emulator.start(() => {
        callbackCalled = true;
        resolve();
      });
    });

    assert.ok(callbackCalled);
    await closeEmulator(emulator);
  });

  it('3.4 close() invokes callback after shutdown', async () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario({ timeline: [] });
    await startEmulator(emulator);

    let callbackCalled = false;
    await new Promise((resolve) => {
      emulator.close(() => {
        callbackCalled = true;
        resolve();
      });
    });

    assert.ok(callbackCalled);
  });

  it('3.5 close() is safe to call when no server exists', () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    // Should not throw
    assert.doesNotThrow(() => emulator.close());
  });

  it('3.6 stop() prevents new connections from being handled', async () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario(validScenario);
    await startEmulator(emulator);

    emulator.stop();

    // Server is still up (not closed), but connection handler is removed.
    // A new client can still connect at TCP level, but should not receive replayed messages.
    const ws = await connectClient();
    assert.equal(ws.readyState, WebSocket.OPEN);

    // Wait long enough that messages would have been replayed
    const received = [];
    ws.on('message', (data) => received.push(data));
    await delay(1500);

    assert.equal(received.length, 0, 'should not receive messages after stop()');

    ws.close();
    await closeEmulator(emulator);
  });
});

// ===========================================================================
//  4. MESSAGE REPLAY
// ===========================================================================

describe('4. Message Replay', () => {
  let emulator;

  beforeEach(async () => {
    emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario(validScenario);
    await startEmulator(emulator);
  });

  afterEach(async () => {
    await closeEmulator(emulator);
  });

  it('4.1 replays all messages from scenario to a connected client', async () => {
    const ws = await connectClient();
    const messages = await collectMessages(ws, validScenario.timeline.length);
    assert.equal(messages.length, validScenario.timeline.length);
    ws.close();
  });

  it('4.2 replayed messages match scenario ipcMessage content exactly', async () => {
    const ws = await connectClient();
    const messages = await collectMessages(ws, validScenario.timeline.length);

    for (let i = 0; i < messages.length; i++) {
      assert.equal(
        messages[i],
        validScenario.timeline[i].ipcMessage,
        `Message ${i} content mismatch`
      );
    }
    ws.close();
  });

  it('4.3 replayed messages arrive in chronological order', async () => {
    const ws = await connectClient();
    const timestamps = [];

    await new Promise((resolve) => {
      let count = 0;
      ws.on('message', () => {
        timestamps.push(Date.now());
        count++;
        if (count >= validScenario.timeline.length) resolve();
      });
    });

    for (let i = 1; i < timestamps.length; i++) {
      assert.ok(
        timestamps[i] >= timestamps[i - 1],
        `Message ${i} arrived before message ${i - 1}`
      );
    }
    ws.close();
  });

  it('4.4 messages are replayed approximately at their scheduled times', async () => {
    const ws = await connectClient();
    const connectTime = Date.now();
    const arrivals = [];

    await new Promise((resolve) => {
      let count = 0;
      ws.on('message', () => {
        arrivals.push(Date.now() - connectTime);
        count++;
        if (count >= validScenario.timeline.length) resolve();
      });
    });

    // Allow 150ms tolerance for timer imprecision and system load
    const TOLERANCE = 150;
    for (let i = 0; i < arrivals.length; i++) {
      const expected = validScenario.timeline[i].time;
      const actual = arrivals[i];
      assert.ok(
        Math.abs(actual - expected) < TOLERANCE,
        `Message ${i}: expected ~${expected}ms, got ${actual}ms (delta: ${Math.abs(actual - expected)}ms)`
      );
    }
    ws.close();
  });

  it('4.5 each connected client gets its own independent replay', async () => {
    const ws1 = await connectClient();
    const p1 = collectMessages(ws1, validScenario.timeline.length);

    // Second client connects 200ms later
    await delay(200);
    const ws2 = await connectClient();
    const p2 = collectMessages(ws2, validScenario.timeline.length);

    const msgs1 = await p1;
    const msgs2 = await p2;

    // Both clients should receive all messages
    assert.equal(msgs1.length, validScenario.timeline.length);
    assert.equal(msgs2.length, validScenario.timeline.length);

    // Content should be identical
    for (let i = 0; i < msgs1.length; i++) {
      assert.equal(msgs1[i], msgs2[i]);
    }

    ws1.close();
    ws2.close();
  });

  it('4.6 server accepts messages from clients without error', async () => {
    const ws = await connectClient();

    // Send some messages like a real receiver would
    ws.send('{"type":"MEDIA_STATUS","status":[],"requestId":0}');
    ws.send('{"type":"PING"}');

    // Should still receive all scenario messages
    const messages = await collectMessages(ws, validScenario.timeline.length);
    assert.equal(messages.length, validScenario.timeline.length);
    ws.close();
  });
});

// ===========================================================================
//  5. IPC MESSAGE FORMAT
// ===========================================================================

describe('5. IPC Message Format', () => {
  let emulator;
  const ajv = new Ajv();

  before(async () => {
    emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario(validScenario);
    await startEmulator(emulator);
  });

  after(async () => {
    await closeEmulator(emulator);
  });

  it('5.1 all replayed messages are valid JSON strings', async () => {
    const ws = await connectClient();
    const messages = await collectMessages(ws, validScenario.timeline.length);

    for (const msg of messages) {
      assert.doesNotThrow(
        () => JSON.parse(msg),
        `Message is not valid JSON: ${msg.substring(0, 80)}...`
      );
    }
    ws.close();
  });

  it('5.2 parsed messages conform to ipc-message schema', async () => {
    const ws = await connectClient();
    const messages = await collectMessages(ws, validScenario.timeline.length);

    for (const msg of messages) {
      const parsed = JSON.parse(msg);
      const valid = ajv.validate(ipcMessageSchema, parsed);
      // Note: some messages in real scenarios may not have all 3 fields.
      // Only validate messages that have namespace and senderId fields.
      if (parsed.namespace && parsed.senderId) {
        assert.ok(valid, `Message failed schema: ${JSON.stringify(ajv.errors)}`);
      }
    }
    ws.close();
  });

  it('5.3 messages include expected Cast namespaces', async () => {
    const ws = await connectClient();
    const messages = await collectMessages(ws, validScenario.timeline.length);

    const namespaces = new Set();
    for (const msg of messages) {
      const parsed = JSON.parse(msg);
      if (parsed.namespace) namespaces.add(parsed.namespace);
    }

    assert.ok(
      namespaces.has('urn:x-cast:com.google.cast.system'),
      'Should contain system namespace'
    );
    assert.ok(
      namespaces.has('urn:x-cast:com.google.cast.media'),
      'Should contain media namespace'
    );
    ws.close();
  });
});

// ===========================================================================
//  6. WEBSOCKET SERVER DETAILS
// ===========================================================================

describe('6. WebSocket Server Details', () => {
  let emulator;

  beforeEach(async () => {
    emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario({ timeline: [] });
    await startEmulator(emulator);
  });

  afterEach(async () => {
    await closeEmulator(emulator);
  });

  it('6.1 server listens on port 8008', async () => {
    const ws = await connectClient('ws://localhost:8008/v2/ipc');
    assert.equal(ws.readyState, WebSocket.OPEN);
    ws.close();
  });

  it('6.2 server handles connections on path /v2/ipc', async () => {
    const ws = await connectClient('ws://localhost:8008/v2/ipc');
    assert.equal(ws.readyState, WebSocket.OPEN);
    ws.close();
  });

  it('6.3 server rejects connections on wrong path', async () => {
    await assert.rejects(
      connectClient('ws://localhost:8008/wrong/path'),
      (err) => {
        // ws library throws on unexpected server response
        return true;
      }
    );
  });
});

// ===========================================================================
//  7. SCHEMA FILE INTEGRITY
// ===========================================================================

describe('7. Schema File Integrity', () => {
  it('7.1 schemas/scenario.json exists and is valid JSON', () => {
    const path = resolve(ROOT, 'schemas/scenario.json');
    assert.ok(existsSync(path), 'scenario.json should exist');
    assert.doesNotThrow(() => JSON.parse(readFileSync(path, 'utf-8')));
  });

  it('7.2 schemas/ipc-message.json exists and is valid JSON', () => {
    const path = resolve(ROOT, 'schemas/ipc-message.json');
    assert.ok(existsSync(path), 'ipc-message.json should exist');
    assert.doesNotThrow(() => JSON.parse(readFileSync(path, 'utf-8')));
  });

  it('7.3 scenario schema requires timeline array', () => {
    assert.ok(scenarioSchema.required.includes('timeline'));
    assert.equal(scenarioSchema.properties.timeline.type, 'array');
  });

  it('7.4 scenario schema requires time and ipcMessage in items', () => {
    const itemProps = scenarioSchema.properties.timeline.items;
    assert.ok(itemProps.required.includes('time'));
    assert.ok(itemProps.required.includes('ipcMessage'));
  });

  it('7.5 ipc-message schema requires data, namespace, senderId', () => {
    assert.ok(ipcMessageSchema.required.includes('data'));
    assert.ok(ipcMessageSchema.required.includes('namespace'));
    assert.ok(ipcMessageSchema.required.includes('senderId'));
  });
});

// ===========================================================================
//  8. CLI BINARY
// ===========================================================================

describe('8. CLI Binary', () => {
  it('8.1 package.json registers chromecast-device-emulator binary', () => {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8'));
    assert.ok(pkg.bin['chromecast-device-emulator'], 'should have full binary name');
  });

  it('8.2 package.json registers cde shorthand binary', () => {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8'));
    assert.ok(pkg.bin['cde'], 'should have cde shorthand');
  });

  it('8.3 CLI entry point file exists', () => {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8'));
    const cliPath = resolve(ROOT, pkg.bin['cde']);
    assert.ok(existsSync(cliPath), `CLI entry point should exist at ${cliPath}`);
  });

  it('8.4 CLI responds to --version flag', async () => {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8'));
    const cliPath = resolve(ROOT, pkg.bin['cde']);

    const output = await new Promise((resolve, reject) => {
      execFile('node', [cliPath, '--version'], (err, stdout, stderr) => {
        if (err) reject(err);
        else resolve((stdout || stderr).trim());
      });
    });

    assert.equal(output, pkg.version, 'version output should match package.json');
  });

  it('8.5 CLI outputs help when run with no arguments', async () => {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8'));
    const cliPath = resolve(ROOT, pkg.bin['cde']);

    const output = await new Promise((resolve, reject) => {
      execFile('node', [cliPath], (err, stdout, stderr) => {
        // commander may exit with code 0 or 1 depending on version
        resolve((stdout || stderr || '').trim());
      });
    });

    assert.ok(output.includes('start'), 'help should mention the start command');
  });
});

// ===========================================================================
//  9. INTEGRATION: FULL ROUND-TRIP
// ===========================================================================

describe('9. Integration: Full Round-Trip with Example Scenario', () => {
  it('9.1 replays example.json scenario and client receives QUEUE_LOAD', async () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario(exampleScenario);
    await startEmulator(emulator);

    const ws = await connectClient();

    // Send bootstrap messages like a real receiver
    ws.send(
      '{"namespace":"urn:x-cast:com.google.cast.system","senderId":"SystemSender","data":"{\\"type\\":\\"ready\\"}"}'
    );

    // Wait until we receive a QUEUE_LOAD message
    const messages = await collectUntil(
      ws,
      (msg) => {
        try {
          const parsed = JSON.parse(msg);
          const data = JSON.parse(parsed.data);
          return data.type && data.type.toUpperCase() === 'QUEUE_LOAD';
        } catch {
          return false;
        }
      },
      30000
    );

    assert.ok(messages.length > 0, 'should have received at least one message');

    // Verify we found QUEUE_LOAD
    const hasQueueLoad = messages.some((msg) => {
      try {
        const parsed = JSON.parse(msg);
        const data = JSON.parse(parsed.data);
        return data.type && data.type.toUpperCase() === 'QUEUE_LOAD';
      } catch {
        return false;
      }
    });
    assert.ok(hasQueueLoad, 'should have received a QUEUE_LOAD message');

    ws.close();
    await closeEmulator(emulator);
  });
});

// ===========================================================================
// 10. EMPTY SCENARIO EDGE CASE
// ===========================================================================

describe('10. Edge Cases', () => {
  it('10.1 handles empty timeline without errors', async () => {
    const emulator = new CastDeviceEmulator({ silent: true });
    emulator.loadScenario({ timeline: [] });
    await startEmulator(emulator);

    const ws = await connectClient();
    assert.equal(ws.readyState, WebSocket.OPEN);

    // Wait a bit — no messages should arrive
    const received = [];
    ws.on('message', (data) => received.push(data));
    await delay(500);

    assert.equal(received.length, 0, 'empty timeline should send no messages');

    ws.close();
    await closeEmulator(emulator);
  });

  it('10.2 loadScenario can be called multiple times (replaces previous)', async () => {
    const emulator = new CastDeviceEmulator({ silent: true });

    // Load first scenario
    emulator.loadScenario(validScenario);
    // Load second scenario (should replace)
    const smallScenario = {
      timeline: [
        { time: 50, ipcMessage: '{"data":"{\\"type\\":\\"test\\"}","namespace":"urn:x-cast:test","senderId":"test"}' },
      ],
    };
    emulator.loadScenario(smallScenario);

    await startEmulator(emulator);
    const ws = await connectClient();

    const messages = await collectMessages(ws, 1);
    assert.equal(messages.length, 1, 'should replay the second scenario, not the first');

    // Wait to confirm no more come
    const extra = [];
    ws.on('message', (data) => extra.push(data));
    await delay(1500);
    assert.equal(extra.length, 0, 'no extra messages from first scenario');

    ws.close();
    await closeEmulator(emulator);
  });
});
