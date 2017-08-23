import CastDeviceEmulator from './index';
const emulator = new CastDeviceEmulator()
;
emulator.loadScenario(require('../scenarios/example.json'));
emulator.start();