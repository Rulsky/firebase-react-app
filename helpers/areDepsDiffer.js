const { join } = require('path')

const { FUNCTIONS_DIR_NAME } = require('../config/constants')

/* eslint-disable import/no-dynamic-require, global-require */
const filterFSDeps = obj => Object.keys(obj).filter((k) => {
  if (typeof obj[k] === 'string') {
    return !obj[k].toLowerCase().includes('file:')
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
    const rootPackage = require(join(process.cwd(), 'package.json'))
    const functionsPackage = require(join(process.cwd(), FUNCTIONS_DIR_NAME, 'package.json'))

    const rootFunctionsDeps = filterFSDeps(functionsPackage.dependencies)
    const filteredFunctionsDeps = filterFSDeps(rootPackage.dependencies)
    return (
      JSON.stringify(filteredFunctionsDeps) !== JSON.stringify(rootFunctionsDeps)
    )
  } catch (error) {
    if (error.message.match(/(cannot find).*package.json/i)) {
      return true
    }
    throw error
  }
}

module.exports = areDepsDiffer
