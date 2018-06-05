# Chromecast Device Emulator

Testing your chromecast receiver app, without a real-device needed.

[![npm](https://img.shields.io/npm/v/chromecast-device-emulator.svg)](https://www.npmjs.com/package/chromecast-device-emulator)
[![Build Status](https://travis-ci.org/ajhsu/chromecast-device-emulator.svg?branch=master)](https://travis-ci.org/ajhsu/chromecast-device-emulator)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## TL;DR
**Chromecast Device Emulator** is a set of tools that enables you to develop, run and test your chromecast receiver app right on your local machine.

## What is this?

While testing your Chromecast Receiver App on a real Google Cast device, is the only way to ensure your app working correctly;
You need to make your app public accessible (and it also needs to be HTTPS).

It means that whenever you're going to test your receiver app, you need to deploy your web app on every single iteration, which is time-wasting.

The emulator is designed for solving this case, so that you can test your cast receiver app right on your local machine.
Which means you can avoid lots of redundant works from your development.

## How it works?

What a real chromecast device do, is providing a chromium browser with a socket server for handing over IPC messages from the sender(s) to our receiver behind the scene.

So we can simply emulate the same context by creating a socket server in the background while we're developing our apps on local machine (e.g. your laptop).


## Usage

There are two ways to use the emulator:

1. CLI: Running the emulator as CLI, ideal for local development.

2. Node API: Install `chromecast-device-emulator` as your dependency, ideal for test automation.

### 1. CLI

Install executable npm package globally

```bash
$ npm install chromecast-device-emulator -g
```

Startup the emulator with a given [scenario json file](#what-is-a-scenario-json-file)

```bash
$ chromecast-device-emulator start scenario.json
```

Or `cde` for short
```bash
$ cde start scenario.json
```

The emulator is up and will serving at port 8008.

Node that the emulator will create a connection for each of chromecast receiver apps,

so you are able to test multiple receiver apps at the same time.

### 2. Node API

Install `chromecast-device-emulator` as your dependency

```bash
npm install chromecast-device-emulator --save-dev
```

Import and create an emulator.

```javascript
var CastDeviceEmulator = require('chromecast-device-emulator');

// Create a new instance of emulator
var emulator = new CastDeviceEmulator();
```

Load and start to serve with your custom [scenario JSON file](#what-is-a-scenario-json-file)

```javascript
// Load pre-recorded scenario
emulator.loadScenario(require('./scenario.json'));

// Start the emulator
emulator.start();

// Server is up for receiver app
// Do something...

// Stop the emulator
emulator.stop();
```

## What is a Scenario JSON file?

Since what emulator did, is simply "replay" the IPC messages from sender to your receiver app.
It means that you have to "record" from the REAL devices to get these messages.

*(See [The IPC Message Recorder](#record-your-scenario-with-ipc-message-recorder) chapter for details)*

From receiver app was booted, until it was closed;
Each of IPC message between sender and receiver will be recorded into one single JSON file, with timestamp.
So that the emulator could "replay" these message at the right time.

And we called it a "Scenario JSON file".

A simple scenario JSON will looks like this:
```json
{
  "timeline": [
    {
      "time": 5520,
      "ipcMessage": "{\"data\":\"{\\\"type\\\":\\\"visibilitychanged\\\"}\",\"namespace\":\"urn:x-cast:com.google.cast.system\",\"senderId\":\"SystemSender\"}"
    }, {
      "time": 5538,
      "ipcMessage": "{\"data\":\"{\\\"type\\\":\\\"standbychanged\\\"}\",\"namespace\":\"urn:x-cast:com.google.cast.system\",\"senderId\":\"SystemSender\"}"
    }, {
      "time": 5926,
      "ipcMessage": "{\"data\":\"{\\\"requestId\\\":1,\\\"type\\\":\\\"GET_STATUS\\\"}\"}"
    }
  ]
}
```
- `timeline` is the array that contains every message that sender sent.
  - `time` represent when is the message was sent (counted from bootstrap).
  - `ipcMessage` represent the data sent from the sender.

## Receiver Utilities

### Record your scenario with IPC Message Recorder
In order to "RECORD" messages from sender, we created a tool that you can record these messages from REAL cast devices.

#### 1. Add `receiver-utils` script into your receiver app

Firstly, you need to place the following script in your receiver app.
```html
<!-- Chromecast Device Emulator's Receiver Utilities -->
<script src="https://cdn.rawgit.com/ajhsu/chromecast-device-emulator/v1.2.6/dist/receiver-utils.min.js"></script>
```

Please make sure that `receiver-utils` placed **BEFORE** google cast SDKs;

So that the message recorder can work correctly.

After placed the script tag, your HTML might look like this:

```html
<!-- Chromecast Device Emulator's Receiver Utilities -->
<script src="https://cdn.rawgit.com/ajhsu/chromecast-device-emulator/v1.2.6/dist/receiver-utils.min.js"></script>
<!-- Cast APIs -->
<script src="//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js"></script>
<!-- Cast Media Library (CML) -->
<script src="//www.gstatic.com/cast/sdk/libs/mediaplayer/1.0.0/media_player.js"></script>
```

Once you are loaded the script correctly, you should see these message from the console via remote debugging:

(If you don't know how to remote debug, see [how to remote debug](https://developers.google.com/cast/docs/debugging) on your cast device)

```
chromecast-device-emulator: receiver-utils loaded.
chromecast-device-emulator: device-polyfill module loaded.
chromecast-device-emulator: scenario-recorder module loaded.
```

Which means that you're ready to go.

> NOTE:  
> Since the `receiver-utils` needs to record messages from WebSocket,  
> it will doing something hacky on your receiver app.  
> So please remember to remove the above script tag on your production build.

#### 2. Start to record your scenario
Once you placed the message recorder into your receiver app, you can start your user scenario on real devices, like casting, pausing, changing volume, seeking .. etc.
Each of these commands will eventually be recorded into our scenario JSON file.

#### 3. Export scenario JSON
Once you've finished your user scenario, you are ready to export your scenario JSON from Chrome DevTool via remote debugging.

Open up you console drawer, and type `CDE.exportScenario()` to export the scenario JSON.

Then you will get a HUGE JSON output like this:

```json
{"timeline":[{"time":17163,"ipcMessage":"{\"data\":\"{\\\"
....
....
....
\"}"}]}
```

Then you can just simply copy and save it into a JSON file, and we will serve it with emulator later.

#### 4. Serve your scenario JSON file with emulator

Now, we got a scenario JSON file from real cast device.

So we're ready to serve and "replay" the scenario with the emulator simply like:

```bash
$ chromecast-device-emulator start scenario.json
```

Please see how to start an emulator from [Usage](#usage) chapter for details.

*Happy casting!*

## Benefits of developing with an Emulator

#### 1. Running your receiver app on local machine.

You can developing your receiver app with a device that runing much faster than Chromecast 1/2/Ultra.

#### 2. Debugging your receiver app on local machine

You don't need to do remote debugging via Chrome inspector anymore,
and take the advantage of Chrome DevTools during your development, yay!

#### 3. Debugging multiple receiver app at same time.

You can test your receiver app in parallel.

#### 4. Running end-to-end testing in CI system.

## LICENSE

MIT