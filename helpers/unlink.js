const { remove } = require('fs-extra')
const destFilename = require('./destFilename')
const { STATIC_DIR, HOSTING_DIR } = require('../config/constants')
const isStatic = require('./isStatic')

const unlink = (filename) => {
  if (isStatic(filename)) {
    return remove(destFilename(filename, STATIC_DIR, HOSTING_DIR))
  }
  return remove(destFilename(filename))
}

module.exports = unlink
