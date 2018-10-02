const { outputFile } = require('fs-extra')

const { error } = require('./logger')
const destFilename = require('./destFilename')
const transformFile = require('./transformFile')

const transform = path => transformFile(path)
  .then(({ code }) => outputFile(destFilename(path), code))
  .catch(err => error(`transform error: ${err}`))

module.exports = transform
