#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const manifest = require('../../package.json');
const { log, error } = require('../log');
const { startEmulator } = require('./app');

program
  .name(manifest.name)
  .version(manifest.version, '-v, --version')
  .usage('start <scenarioFilePath>');

/**
 * Defaults to help command
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

/**
 * start command
 */
program
  .command('start <filepath>')
  .description(
    'Start a chromecast-device-emulator server that serves with given scenario'
  )
  .action(startEmulator);

program.parse(process.argv);
