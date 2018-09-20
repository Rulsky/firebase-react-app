#!/usr/bin/env node
const commander = require('commander')

const { start, build } = require('./scripts')
const { version } = require('./package.json')

commander
  .version(version, '-v, --version')
  .option('-c --clean', 'fully delete functions dir')
  .option('--yarn', 'use yarn to install dependencies')

commander
  .command('start')
  .description('starts development')
  .action((command) => {
    start(command)
  })

commander
  .command('build')
  .description('builds for deploy')
  .action((command) => {
    build(command)
  })

commander.parse(process.argv)
