const {
  clearFunctionsDir,
  parseCommanderOptions,
  serveFirebase,
  watcher,
} = require('../helpers')
const startWds = require('../helpers/startWds')

module.exports = (cmd) => {
  process.env.ENV = 'development'
  process.env.BABEL_ENV = 'development'
  const options = parseCommanderOptions(cmd, 'clean', 'yarn')
  return clearFunctionsDir(options)
    .then(() => watcher(options))
    .then(() => serveFirebase())
    .then(() => startWds())
}
