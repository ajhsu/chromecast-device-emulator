import CastDeviceEmulator from './index';
const emulator = new CastDeviceEmulator();
emulator.loadScenario(require('../scenarios/unit-testing.json'));
emulator.start();
emulator.close();