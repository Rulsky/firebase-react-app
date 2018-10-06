const { copy } = require('fs-extra')

const transform = require('./transform')
const handleDeps = require('./handleDeps')
const isStatic = require('./isStatic')
const destFilename = require('./destFilename')
const { info, error } = require('./logger')
const { rootPackage, STATIC_DIR, HOSTING_DIR } = require('../config/constants')

const handleFiles = (file, yarn = false) => {
  if (file === rootPackage) {
    return handleDeps(yarn)
      .then((result) => {
        if (result) {
          info('dependencies have been changed')
        } else {
          info('no changes in dependencies')
        }
      })
      .catch(err => error(`error while handling new dependencies:\n${err}\n`))
  }
  if (isStatic(file)) {
    return copy(file, destFilename(file, STATIC_DIR, HOSTING_DIR))
  }
  return transform(file)
    .then(() => info(`File ${file} has been changed`))
    .catch(err => error(`error while transforming:\n${err}\n`))
}

module.exports = handleFiles
