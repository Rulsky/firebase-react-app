const { join } = require('path')
const { remove, readdir } = require('fs-extra')

const { error } = require('./logger')
const { FUNCTIONS_DIR } = require('../config/constants')


const clearFunctionsDir = ({ clean }) => {
  if (clean === true) {
    return remove(FUNCTIONS_DIR)
  }
  return readdir(FUNCTIONS_DIR)
    .then(files => files.filter(f => f !== 'node_modules'
      && f !== 'package-lock.json'
      && f !== 'package.json'))
    .then(files => Promise.all(files.map(f => remove(join(FUNCTIONS_DIR, f)))))
    .catch(err => error(
      'error while cleaning in\n',
      FUNCTIONS_DIR,
      '\n',
      err
    ))
}

module.exports = clearFunctionsDir
