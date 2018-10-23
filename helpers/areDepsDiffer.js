const { join } = require('path')

const { FUNCTIONS_DIR_NAME } = require('../config/constants')

const filterFSDeps = obj => Object.keys(obj).filter((k) => {
  if (k === 'source-map-support' || k === '@rulsky/firebase-react-app') {
    return false
  }
  if (typeof obj[k] === 'string') {
    const criteria = new RegExp(/file|\.\.|\.\//, 'i')
    return !obj[k].match(criteria)
  }
  return true
})
  .sort()
  .reduce((acc, cv) => {
    acc[cv] = obj[cv]
    return acc
  }, {})

const areDepsDiffer = () => {
  try {
    /* eslint-disable import/no-dynamic-require, global-require */
    const rootPackage = require(join(process.cwd(), 'package.json'))
    const functionsPackage = require(join(process.cwd(), FUNCTIONS_DIR_NAME, 'package.json'))

    const rootFunctionsDeps = filterFSDeps(functionsPackage.dependencies)
    const filteredFunctionsDeps = filterFSDeps(rootPackage.dependencies)
    return (
      JSON.stringify(filteredFunctionsDeps) !== JSON.stringify(rootFunctionsDeps)
    )
  } catch (error) {
    if (error.message.match(/find.*package.json/i)) {
      return true
    }
    throw error
  }
}

module.exports = areDepsDiffer
