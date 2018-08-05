const { join } = require('path')

const { FUNCTIONS_DIR_NAME } = require('../../config/constants')

/* eslint-disable import/no-dynamic-require, global-require */
const rootPackage = require(join(process.cwd(), 'package.json'))
const functionsPackage = require(join(process.cwd(), FUNCTIONS_DIR_NAME, 'package.json'))

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
  const rootFunctionsDeps = filterFSDeps(functionsPackage.dependencies)
  const filteredFunctionsDeps = filterFSDeps(rootPackage.dependencies)
  return (
    JSON.stringify(filteredFunctionsDeps) !== JSON.stringify(rootFunctionsDeps)
  )
}

module.exports = areDepsDiffer
