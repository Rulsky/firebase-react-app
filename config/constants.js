const { join } = require('path')

const FUNCTIONS_DIR_NAME = 'functions'
const FUNCTIONS_DIR = join(process.cwd(), FUNCTIONS_DIR_NAME)

const SRC_DIR = join(process.cwd(), 'src')

module.exports = {
  FUNCTIONS_DIR,
  FUNCTIONS_DIR_NAME,
  SRC_DIR,
}
