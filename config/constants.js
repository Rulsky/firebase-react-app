const { join } = require('path')

// eslint-disable-next-line import/no-dynamic-require
const FBS_CONF = require(join(process.cwd(), 'firebase.json'))

const FRA_CONFIG = require('../helpers/getFraConfig')()

const FUNCTIONS_DIR_NAME = FBS_CONF.functions
  ? FBS_CONF.functions.source
  : 'functions'
const FUNCTIONS_DIR = join(process.cwd(), FUNCTIONS_DIR_NAME)

const HOSTING_DIR_NAME = FBS_CONF.hosting.public
const HOSTING_DIR = join(process.cwd(), HOSTING_DIR_NAME)

const SRC_DIR = join(process.cwd(), 'src')

const CLIENT_ENTRY = './src/client/index.js'

const PORTS = {
  emulator: FRA_CONFIG.emulatorPort || 5000,
  devServer: FRA_CONFIG.devPort || 3000,
}

const ignored = [
  '**/__spec__/**',
  '**/__specs__/**',
  '**/__test__/**',
  '**/__tests__/**',
  '**/__mocks__/**',
  '*.test.js',
  '*.spec.js',
]
const rootPackage = join(process.cwd(), 'package.json')
const src = join(SRC_DIR, '**')
const watchList = [rootPackage, src]

const RENDER_MIDDLEWARE_PATH = FRA_CONFIG.renderMiddleware
  ? join(process.cwd(), FRA_CONFIG.renderMiddleware)
  : join(SRC_DIR, 'server', 'renderMiddleware.js')

module.exports = {
  FRA_CONFIG,
  FBS_CONF,
  CLIENT_ENTRY,
  FUNCTIONS_DIR_NAME,
  FUNCTIONS_DIR,
  HOSTING_DIR,
  PORTS,
  RENDER_MIDDLEWARE_PATH,
  ignored,
  rootPackage,
  watchList,
}
