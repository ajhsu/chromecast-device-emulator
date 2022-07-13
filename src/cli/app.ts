import path from 'path';
import { log, error } from '../log';
import CastDeviceEmulator from '../';

export function startEmulator(filepath: string, cmd: any) {
  const fullPath = path.resolve(process.cwd(), filepath);
  const emulator = new CastDeviceEmulator();
  try {
    emulator.loadScenario(require(fullPath));
    log(`Scenario file <${fullPath}> has been loaded.`);
    emulator.start();
  } catch (err) {
    error(err);
  }
}

module.exports = {
  startEmulator
};
