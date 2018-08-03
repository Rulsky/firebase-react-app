const { outputFile } = require('fs-extra')

const destFilename = require('./destFilename')
const transformFile = require('./transformFile')

const { error } = console

const transform = path => transformFile(path)
  .then(({ code }) => outputFile(destFilename(path), code))
  .catch(err => error(err))

module.exports = transform
