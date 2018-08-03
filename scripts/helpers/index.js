const clearFunctionsDir = require('./clearFunctionsDir')
const destFilename = require('./destFilename')
const generateFunctionsPackage = require('./generateFunctionsPackage')
const runNpmInstall = require('./runNpmInstall')
const runWatchSrc = require('./runWatchSrc')
const serveFirebase = require('./serveFirebase')
const transform = require('./transform')
const transformFile = require('./transformFile')
const unlink = require('./unlink')

module.exports = {
  clearFunctionsDir,
  destFilename,
  generateFunctionsPackage,
  runNpmInstall,
  runWatchSrc,
  serveFirebase,
  transform,
  transformFile,
  unlink,
}
