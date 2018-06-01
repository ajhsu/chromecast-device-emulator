#!/usr/bin/env node
'use strict';

var path = require('path');
var program = require('commander');
var manifest = require('../../package.json');

var _require = require('../log'),
    log = _require.log,
    error = _require.error;

var _require2 = require('./app'),
    startEmulator = _require2.startEmulator;

program.name(manifest.name).version(manifest.version, '-v, --version').usage('start <scenarioFilePath>');

/**
 * Defaults to help command
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

/**
 * start command
 */
program.command('start <filepath>').description('Start a chromecast-device-emulator server that serves with given scenario').action(startEmulator);

program.parse(process.argv);