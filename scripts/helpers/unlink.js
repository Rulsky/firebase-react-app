const { remove } = require('fs-extra')
const destFilename = require('./destFilename')

const unlink = filename => remove(destFilename(filename))

module.exports = unlink
