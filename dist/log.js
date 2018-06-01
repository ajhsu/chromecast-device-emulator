'use strict';

function log() {
  var _console;

  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  (_console = console).log.apply(_console, ['chromecast-device-emulator:'].concat(params));
}

function warn() {
  var _console2;

  for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    params[_key2] = arguments[_key2];
  }

  (_console2 = console).warn.apply(_console2, ['chromecast-device-emulator:'].concat(params));
}

function error() {
  var _console3;

  for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    params[_key3] = arguments[_key3];
  }

  (_console3 = console).error.apply(_console3, ['chromecast-device-emulator:'].concat(params));
}

module.exports = {
  log: log,
  warn: warn,
  error: error
};