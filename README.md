# Chromecast Device Emulator

Testing your chromecast receiver app, without a real-device needed.

[![npm](https://img.shields.io/npm/v/chromecast-device-emulator.svg)](https://www.npmjs.com/package/chromecast-device-emulator)
[![Build Status](https://travis-ci.org/ajhsu/chromecast-device-emulator.svg?branch=master)](https://travis-ci.org/ajhsu/chromecast-device-emulator)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## TL;DR
**Chromecast Device Emulator** is a set of tools that enables you to develop, run and test your chromecast receiver app right on your local machine.

## What is this?

While testing your Chromecast Receiver App on a physical Chromecast device is the only way to ensure your app working correctly; You might need to make your app public accessible at first (and it also needs to be HTTPS). 

So whenever you're going to test your receiver app, you may need to edit your receiver app on a local machine then deploy to an accessible space back and forth... which is time-wasting while developing a receiver app.

Chromecast Device Emulator is designed for solving this case so that you can test your chromecast receiver app right on your local machine. Which means you can avoid lots of shitty works when you're developing your apps.

## How it works?

What a real chromecast device do is providing a chromium browser with a socket server for handing over IPC messages from the sender(s) to our receiver behind the scene.

So we can simply emulate the same context by creating a socket server in the background while we're developing our apps on local machine (e.g. your laptop).

### Benefits of developing with an Emulator

#### 1. Running your receiver app on local machine.

Which means you can developing your receiver app with a device that runing much faster than Chromecast 1/2/Ultra.

#### 2. Debugging your receiver app on local machine

Which means you don't need to do remote debugging via Chrome inspector anymore,
and take the advantage of Chrome DevTools during your development, yay!

#### 3. Debugging multiple receiver app at same time.

 Which means you can test your receiver app in parallel

#### 4. Running end-to-end testing in CI system.

## Usage

There are two ways to use the emulator:

1. Running the emulator as CLI, better for doing local development.

2. Installing npm library `chromecast-device-emulator` as dependency, then requiring it from your code, better for integrate with your end-to-end testing.

### 1. Running Chromecast Device Emulator standalone (CLI)

Install executable npm package globally

```bash
npm install chromecast-device-emulator -g
```

Startup the emulator with scenario

```bash
chromecast-device-emulator -s example.json
```

The emulator is up and will serving at port 8008.

The emulator will create a standalone connection for 
each of chromecast receiver pages, so you can test with multiple receiver apps at same time.

### 2. Integrate npm library into your project

```bash
npm install chromecast-device-emulator --save-dev
```

```javascript
var CastDeviceEmulator = require('chromecast-device-emulator');

// Create a new instance of emulator
var emulator = new CastDeviceEmulator();

// Load pre-recorded scenario
emulator.loadScript(require('./example.json'));

// Start the emulator
emulator.start();

// Server is up for receiver app
// Do something...

// Stop the emulator
emulator.stop();
```

## Toolchain

### The IPC Message Recorder
*(Still work in progress)*

## LICENSE

MIT