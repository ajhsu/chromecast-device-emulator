import CastDeviceEmulator from './';
const emulator = new CastDeviceEmulator();

emulator.loadScenario(require('../scenarios/example.json'));
emulator.start();
