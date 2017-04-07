import CastDeviceEmulator from './castDeviceEmulator';
const emulator = new CastDeviceEmulator();
emulator.loadScript(require('../recorded-scripts/example.json'));
emulator.start();
