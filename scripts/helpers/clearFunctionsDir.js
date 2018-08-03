const { join } = require('path')
const { remove, readdir } = require('fs-extra')

const { FUNCTIONS_DIR } = require('../../config/constants')

const { error } = console

const clearFunctionsDir = () => readdir(FUNCTIONS_DIR)
  .then(files => files.filter(f => f !== 'node_modules' && f !== 'package-lock.json'))
  .then(files => Promise.all(files.map(f => remove(join(FUNCTIONS_DIR, f)))))
  .catch(err => error(
    'error while cleaning in\n',
    FUNCTIONS_DIR,
    '\n',
    err
  ))

module.exports = clearFunctionsDir
