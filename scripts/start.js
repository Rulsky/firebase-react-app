const {
  clearFunctionsDir,
  watcher,
  // serveFirebase,
} = require('./helpers')


module.exports = () => clearFunctionsDir()
  .then(() => watcher())
  // .then(() => serveFirebase())
