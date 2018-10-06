const { parse, join } = require('path')

const { FUNCTIONS_DIR, SRC_DIR } = require('../config/constants')

const destFilename = (filename, splitPoint = SRC_DIR, dest = FUNCTIONS_DIR) => {
  const { dir, name, ext } = parse(filename)
  const split = dir.split(splitPoint)
  const relPath = split[1]
  const destExt = dest === FUNCTIONS_DIR ? '.js' : ext

  return join(dest, relPath, `${name}${destExt}`)
}

module.exports = destFilename
