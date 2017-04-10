import CastDeviceEmulator from './castDeviceEmulator';
const emulator = new CastDeviceEmulator();
emulator.loadScript(require('../recorded-scripts/unit-testing.json'));
emulator.start();
