const { join } = require('path')

module.exports = () => {
  const rootPackagePath = join(process.cwd(), 'package.json')
  const rcPath = join(process.cwd(), '.frarc.json')
  let rc
  let packageConfig

  try {
    /* eslint-disable global-require, import/no-dynamic-require */
    packageConfig = require(rootPackagePath).fra
    rc = require(rcPath)
  } catch (error) {
    // no handling required
  }
  if (packageConfig) return packageConfig
  if (rc) return rc
  return {}
}
