const { join } = require('path')

const FUNCTIONS_DIR = join(process.cwd(), 'functions')

const SRC_DIR = join(process.cwd(), 'src')

module.exports = {
  FUNCTIONS_DIR,
  SRC_DIR,
}
