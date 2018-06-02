const CastDeviceEmulator = require('chromecast-device-emulator');
const emulator = new CastDeviceEmulator();

emulator.loadScenario(require('../scenarios/example.json'));
emulator.start();
