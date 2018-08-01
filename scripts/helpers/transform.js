const { outputFile } = require('fs-extra')

const destFilename = require('./destFilename')
const transformFile = require('./transformFile')


const transform = path => transformFile(path)
  .then(({ code }) => outputFile(destFilename(path), code))
  .catch(err => console.log(err))

module.exports = transform
