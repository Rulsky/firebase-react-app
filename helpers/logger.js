const chalk = require('chalk')

const { log, info, error } = console

const customLog = str => log(chalk.green(str))
const customInfo = str => info(chalk.cyan(str))
const customError = err => error(chalk.red(err))

module.exports = {
  log: customLog,
  info: customInfo,
  error: customError,
  nativeLog: log,
}
