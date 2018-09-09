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

const HOSTING_DIR_NAME = FBS_CONF.hosting.public
const HOSTING_DIR = join(process.cwd(), HOSTING_DIR_NAME)

const FUNCTIONS_DIR_NAME = 'functions'
const FUNCTIONS_DIR = join(process.cwd(), FUNCTIONS_DIR_NAME)

const SRC_DIR = join(process.cwd(), 'src')
const CLIENT_ENTRY = join(SRC_DIR, 'client', 'index.jsx')

module.exports = {
  FBS_CONF,
  CLIENT_ENTRY,
  FUNCTIONS_DIR_NAME,
  FUNCTIONS_DIR,
  HOSTING_DIR,
  SRC_DIR,
}
