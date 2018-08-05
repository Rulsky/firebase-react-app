const areDepsDiffer = require('./areDepsDiffer')
const generateFunctionsPackage = require('./generateFunctionsPackage')
const runNpmInstall = require('./runNpmInstall')

const handleDeps = () => {
  if (areDepsDiffer()) {
    return generateFunctionsPackage()
      .then(() => runNpmInstall())
  }
  return Promise.resolve(null)
}

module.exports = handleDeps
