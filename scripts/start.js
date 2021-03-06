const {
  clearFunctionsDir,
  parseCommanderOptions,
  serveFirebase,
  watcher,
} = require('../helpers')
const cleanDistDir = require('../helpers/cleanDistDir')
const startWds = require('../devServer')
const webpackWatch = require('../devServer/webpackWatch')

module.exports = (cmd) => {
  process.env.ENV = 'development'
  process.env.BABEL_ENV = 'development'
  const options = parseCommanderOptions(cmd, 'clean', 'yarn')
  return cleanDistDir()
    .then(() => clearFunctionsDir(options))
    .then(() => watcher(options))
    .then(() => webpackWatch())
    .then(() => serveFirebase())
    .then(() => startWds())
}
