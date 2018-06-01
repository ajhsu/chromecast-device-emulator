function log(...params) {
  console.log('chromecast-device-emulator:', ...params);
}

function warn(...params) {
  console.warn('chromecast-device-emulator:', ...params);
}

function error(...params) {
  console.error('chromecast-device-emulator:', ...params);
}

module.exports = {
  log,
  warn,
  error
};