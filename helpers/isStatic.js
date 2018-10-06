const { STATIC_DIR } = require('../config/constants')

const isStatic = filename => filename.indexOf(STATIC_DIR) >= 0

module.exports = isStatic
