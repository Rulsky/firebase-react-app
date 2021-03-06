const { join } = require('path')

const FBS_CONF = {
  hosting: {
    public: 'public',
    ignore: [
      'firebase.json',
      '**/.*',
      '**/node_modules/**',
    ],
    rewrites: [
      {
        source: '**',
        function: 'app',
      },
    ],
  },
}
const FRA_CONFIG = null
const HOSTING_DIR_NAME = FBS_CONF.hosting.public
const HOSTING_DIR = join(process.cwd(), HOSTING_DIR_NAME)

const FUNCTIONS_DIR_NAME = 'functions'
const FUNCTIONS_DIR = join(process.cwd(), FUNCTIONS_DIR_NAME)

const SRC_DIR = join(process.cwd(), 'src')
const CLIENT_ENTRY = join(SRC_DIR, 'client', 'index.jsx')

const STATIC_DIR_NAME = 'static'

const PORTS = {
  emulator: 5000,
  devServer: 3000,
}

const RENDER_MIDDLEWARE_PATH = require.resolve('../../devServer/__mocks__/renderMiddleware.js')


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
const STATIC_DIR = join(process.cwd(), STATIC_DIR_NAME)
const STATIC_DIR_PATTERN = join(STATIC_DIR, '**')
const watchList = [rootPackage, src, STATIC_DIR_PATTERN]

module.exports = {
  FRA_CONFIG,
  FBS_CONF,
  CLIENT_ENTRY,
  FUNCTIONS_DIR_NAME,
  FUNCTIONS_DIR,
  HOSTING_DIR,
  SRC_DIR,
  STATIC_DIR_NAME,
  STATIC_DIR,
  STATIC_DIR_PATTERN,
  PORTS,
  RENDER_MIDDLEWARE_PATH,
  ignored,
  rootPackage,
  watchList,
}
