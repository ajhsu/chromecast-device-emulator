# Chromecast Device Emulator

Testing your chromecast receiver app, without a real-device needed.

[![npm](https://img.shields.io/npm/v/chromecast-device-emulator.svg)](https://www.npmjs.com/package/chromecast-device-emulator)
[![Build Status](https://travis-ci.org/ajhsu/chromecast-device-emulator.svg?branch=master)](https://travis-ci.org/ajhsu/chromecast-device-emulator)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## TL;DR
**Chromecast Device Emulator** is a set of tools that enables you to develop, run, and test your chromecast receiver app right on your local machine.

## What is this?
So far the only way to test your receiver app is to run on a Google Cast device (e.g. Chromecast, Google Home). Also, you have to make sure that your app is public accessible via an HTTPS connection.

It turns out whenever you're try to test the receiver app, you have to deploy the application every single time; This kind of deploy-and-debug routine could be redundant and time-wasting.

The emulator is designed for letting developers getting away from this, by emulating a Google Cast right on your local machine.

## How it works?

Before getting started, we have to understand how the emulator works:

What a Google Cast device do, is providing a chromium browser with a socket server that handing over IPC messages between sender(s) and receiver.

So we can emulate the same context by creating a socket server in the background while we're developing receiver app on a local machine (e.g. your laptop).

<p align='left'>
<img src='https://unpkg.com/chromecast-device-emulator/diagram.svg' alt='Diagram of Emulator'>
</p>

## Usage

There're two types of usage:

1. CLI: Running the emulator as a CLI. Ideal for local development.

2. Node API: Install `chromecast-device-emulator` as your dependency. Ideal for integrating your test automation.

### 1. CLI

To run as a CLI, we can install executable npm package globally:

```bash
$ npm install chromecast-device-emulator -g
```

Startup the emulator with a [pre-recorded scenario JSON file](#what-is-a-pre-recorded-scenario-json-file)

```bash
$ chromecast-device-emulator start scenario.json
```

Or `cde` for short
```bash
$ cde start scenario.json
```

The emulator will up and serve at port 8008 for local development.

> Note that the emulator will establish a new connection for each receiver app so that you can test multiple receiver apps at the same time.

### 2. Node API

To use as a node package, you can install as your dependency:
```bash
npm install chromecast-device-emulator --save-dev
```

After that, we can import the package and create an emulator.

```javascript
var CastDeviceEmulator = require('chromecast-device-emulator');

// Create a new instance
var emulator = new CastDeviceEmulator();
```

Load and serve your [pre-recorded scenario JSON file](#what-is-a-pre-recorded-scenario-json-file)

```javascript
// Load pre-recorded scenario
emulator.loadScenario(require('./scenario.json'));

// Startup the emulator
emulator.start();

// Server is up for receiver app
// Do something...

// Stop the emulator
emulator.stop();
```

## What is a pre-recorded scenario JSON file?

What emulator did, is try to **REPLAY** the IPC messages between sender and receiver. Which means that you have to **PRE-RECORD** from a real Google Cast device to get these IPC messages.

*(See [The IPC Message Recorder](#record-your-scenario-with-ipc-message-recorder) chapter for details)*

From receiver app booted until it was closed; Each of IPC message between sender and receiver should be recorded into one single JSON file with timestamps.
By doing so, the emulator is able to **REPLAY** these message when we needed it. And we called it a "Scenario JSON file".

A simple scenario JSON will look like this:
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
In order to **PRE-RECORD** messages from sender, we've created a tool that you can intercept these messages from a physical Google Cast device by following steps:

#### 1. Add `receiver-utils` script into your receiver app

First, you need to place the following script tag into your receiver app.
```html
<!-- Chromecast Device Emulator's Receiver Utilities -->
<script src="https://unpkg.com/chromecast-device-emulator/dist/receiver-utils.min.js"></script>
```

Please make sure that `receiver-utils` was placed **BEFORE** the google cast SDKs; So that the message recorder can work correctly.

After placed the script tag, your HTML might look like this:

```html
<!-- Chromecast Device Emulator's Receiver Utilities -->
<script src="https://unpkg.com/chromecast-device-emulator/dist/receiver-utils.min.js"></script>
<!-- Cast APIs -->
<script src="//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js"></script>
<!-- Cast Media Library (CML) -->
<script src="//www.gstatic.com/cast/sdk/libs/mediaplayer/1.0.0/media_player.js"></script>
```

Once you are placed the script tag correctly, you should see the following debug message in your console (via remote debugging):

(If you don't know how to remote debug, see [how to remote debug](https://developers.google.com/cast/docs/debugging) on your cast device)

```
chromecast-device-emulator: receiver-utils loaded.
chromecast-device-emulator: device-polyfill module loaded.
chromecast-device-emulator: scenario-recorder module loaded.
```

It means you're ready to go!

> NOTE:  
> Since the `receiver-utils` need to pre-record messages from WebSocket,  
> it makes some hacky modification onto your receiver app during the runtime.  
> So please remember to remove the above script tag from your production build.

#### 2. Start to record your scenario
Once you placed the message recorder into your receiver app, you can start the user scenario on the physical device (e.g. casting to the device, pausing a video, changing the volume, seeking for specific progress).
Each of the user behavior/interaction will be recorded in the scenario JSON file.

#### 3. Export scenario JSON
Once you've finished your user scenario, you are ready to export the scenario JSON from Chrome DevTool:

Open up your console drawer and type `CDE.exportScenario()` to export the scenario JSON.

Then you will get a HUGE JSON output like this:

```json
{"timeline":[{"time":17163,"ipcMessage":"{\"data\":\"{\\\"
....
....
....
\"}"}]}
```

Just copy and save it into a plain JSON file, and we will need to serve the file later with the emulator.

#### 4. Serve your scenario JSON file with emulator

Now, we got a scenario JSON file from Google Cast device.

So we're ready to serve and "replay" the scenario with the emulator by running:

```bash
$ chromecast-device-emulator start scenario.json
```

That's all! The emulator is now running in the background for you. Try to open up your receiver app on your local machine and see if the receiver is communicating with emulator correctly.

*Happy casting!*

## Few benefits from developing with emulator

#### 1. Able to run your receiver app on the local machine.

You can test the receiver app with your local machine that runs 100x faster than a physical Google Case device (e.g. Chromecast 1/2/Ultra)

#### 2. Debugging your receiver app on local machine

You don't need to do remote debugging via Chrome inspector anymore;
And you can take advantage of Chrome DevTools during the local development.

#### 3. Debugging multiple receiver apps at the same time.

You can test your receiver app in parallel.

#### 4. Running end-to-end testing in your continuous integration system.

Once we jump off our runtime from physical Google Cast devices, we're able to do end-to-end testing right on your local machine; And if you're able to run on your local machine, why not integrate with your CI build process?

## LICENSE

MIT
