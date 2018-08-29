const { join } = require('path')

const FUNCTIONS_DIR_NAME = 'functions'
const FUNCTIONS_DIR = join(process.cwd(), FUNCTIONS_DIR_NAME)

const HOSTING_DIR_NAME = 'dist'
const HOSTING_DIR = join(process.cwd(), HOSTING_DIR_NAME)

const SRC_DIR = join(process.cwd(), 'src')

const CLIENT_ENTRY = join(SRC_DIR, '..', 'client', 'index.js')

module.exports = {
  CLIENT_ENTRY,
  FUNCTIONS_DIR_NAME,
  FUNCTIONS_DIR,
  HOSTING_DIR,
  SRC_DIR,
}
