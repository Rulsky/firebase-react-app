const parseCommanderOptions = require('../helpers/parseCommanderOptions')
const clearFunctionsDir = require('../helpers/clearFunctionsDir')
const buildTransform = require('../helpers/buildTransform')
const cleanDistDir = require('../helpers/cleanDistDir')
const buildBundle = require('../helpers/buildBundle')
const { info, error } = require('../helpers/logger')

module.exports = (cmd) => {
  process.env.ENV = 'production'
  process.env.BABEL_ENV = 'production'
  const options = parseCommanderOptions(cmd, 'clean')
  return cleanDistDir()
    .then(() => clearFunctionsDir(Object.assign({}, options, { clean: true })))
    .then(() => buildTransform())
    .then(wt => wt.close())
    .then(() => buildBundle())
    .then(() => info('Build is ready'))
    .catch(err => error(`Error while build ${err}`))
}
