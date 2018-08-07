const areDepsDiffer = require('./areDepsDiffer')
const generateFunctionsPackage = require('./generateFunctionsPackage')
const runNpmInstall = require('./runNpmInstall')

const handleDeps = (yarn) => {
  if (areDepsDiffer()) {
    return generateFunctionsPackage()
      .then(() => runNpmInstall(yarn))
  }
  return Promise.resolve(null)
}

module.exports = handleDeps
