const {
  clearFunctionsDir,
  parseCommanderOptions,
  serveFirebase,
  watcher,
} = require('./helpers')


module.exports = (cmd) => {
  const options = parseCommanderOptions(cmd, 'clean')
  return clearFunctionsDir(options)
    .then(() => watcher())
    .then(() => serveFirebase())
}
