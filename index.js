#!/usr/bin/env node
const commander = require('commander')

const { start, build } = require('./scripts')
const { version } = require('./package.json')

commander
  .version(version, '-v, --version')

commander
  .command('start')
  .description('starts development')
  .action(() => {
    start()
  })

commander
  .command('build')
  .description('builds for deploy')
  .action(() => {
    build()
  })

commander.parse(process.argv)
