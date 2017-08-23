# Chromecast Device Emulator

Testing your chromecast receiver app, without a real-device needed.

[![npm](https://img.shields.io/npm/v/chromecast-device-emulator.svg)](https://www.npmjs.com/package/chromecast-device-emulator)
[![Build Status](https://travis-ci.org/ajhsu/chromecast-device-emulator.svg?branch=master)](https://travis-ci.org/ajhsu/chromecast-device-emulator)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## What is this?

While testing your Chromecast Receiver App on a physical Chromecast device is the only way to ensure your app working correctly; You might need to make your app public accessible at first (and it also needs to be HTTPS). So whenever you're going to test your receiver app, you will need to do some extra afford like committing, deploying... which is time-wasting while developing a receiver app.

Chromecast Device Emulator is designed for solving this case so that you can test your chromecast receiver app right on your local machine. So you can avoid a lot of shitty works when you're developing your apps.

## How it works?

While a real chromecast device do is actually running a chromium browser and running a socket server to passing IPC message from sender(s) in the background. So we can simply emulate the same context by creating a socket server in the background while we're developing our apps.

## Usage

There are two ways to use the emulator:

1. Running the emulator alone, better for doing local development.

2. Installing npm library `chromecast-device-emulator` as dependency, then requiring it from your code, better for integrate with your end-to-end testing.

### 1. Running Chromecast Device Emulator standalone

Install npm dependencies

```bash
npm install
```

Startup the emulator

```bash
npm start
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

// Server is up for receiver apps
// Do something...

// Stop the emulator
emulator.stop();
```

## Tools

> (Recording helper script)

## LICENSE

MIT