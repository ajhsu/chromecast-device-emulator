const path = require('path');
const CastDeviceEmulator = require('../');

function startEmulator(filepath, cmd) {
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
