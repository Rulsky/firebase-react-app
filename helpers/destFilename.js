const { parse, join } = require('path')

const { FUNCTIONS_DIR, SRC_DIR } = require('../config/constants')

const destFilename = (filename) => {
  const { dir, name } = parse(filename)
  const relPath = dir.split(SRC_DIR)[1]
  return join(FUNCTIONS_DIR, relPath, `${name}.js`)
}

module.exports = destFilename
