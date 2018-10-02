const { parse, join } = require('path')

const { FUNCTIONS_DIR, SRC_DIR } = require('../config/constants')

const destFilename = (filename) => {
  const { dir, name } = parse(filename)
  const split = dir.split(SRC_DIR)

  let relPath
  if (split.length === 1) {
    relPath = split[0] // eslint-disable-line prefer-destructuring
  } else {
    relPath = split[1] // eslint-disable-line prefer-destructuring
  }

  return join(FUNCTIONS_DIR, relPath, `${name}.js`)
}

module.exports = destFilename
