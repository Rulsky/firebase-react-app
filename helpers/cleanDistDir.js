const { remove } = require('fs-extra')

const { HOSTING_DIR } = require('../config/constants')
const { log } = require('./logger')

const cleanDistDir = () => {
  log(`cleaning up ${HOSTING_DIR}`)
  return remove(HOSTING_DIR)
}

module.exports = cleanDistDir
