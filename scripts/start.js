const {
  clearFunctionsDir,
  generateFunctionsPackage,
  runNpmInstall,
  runWatchSrc,
  // serveFirebase,
} = require('./helpers')

const { info } = console

module.exports = () => clearFunctionsDir()
  .then(() => generateFunctionsPackage())
  .then(() => runNpmInstall())
  .then(() => runWatchSrc())
  .then(msg => info(msg))
// .then(() => serveFirebase())
