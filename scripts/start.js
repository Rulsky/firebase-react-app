const {
  clearFunctionsDir,
  parseCommanderOptions,
  serveFirebase,
  watcher,
} = require('./helpers')


module.exports = (cmd) => {
  const options = parseCommanderOptions(cmd, 'clean', 'yarn')
  return clearFunctionsDir(options)
    .then(() => watcher(options))
    .then(() => serveFirebase())
}
