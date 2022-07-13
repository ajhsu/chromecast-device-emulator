#!/usr/bin/env node

import program from 'commander';
import manifest from '../../package.json';
import { startEmulator } from './app';

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
