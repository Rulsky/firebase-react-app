const transform = require('./transform')
const handleDeps = require('./handleDeps')
const { info, error } = require('./logger')
const { rootPackage } = require('../config/constants')

const handleFiles = (file, yarn = false) => {
  if (file === rootPackage) {
    return handleDeps(yarn)
      .then((result) => {
        if (result) {
          info('Deps have been changed')
        } else {
          info('No new Deps')
        }
      })
      .catch(err => error(`error while handling new dependencies:\n${err}\n`))
  }
  return transform(file)
    .then(() => info(`File ${file} has been changed`))
    .catch(err => error(`error while transforming:\n${err}\n`))
}

module.exports = handleFiles
