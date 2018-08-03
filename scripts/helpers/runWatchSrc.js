const { join } = require('path')
const { watch } = require('chokidar')

const { SRC_DIR } = require('../../config/constants')
const transform = require('./transform')
const unlink = require('./unlink')

const src = join(SRC_DIR, '**')
const { log, error } = console

const runWatchSrc = () => new Promise((resolve, reject) => {
  const srcWatcher = watch(src)
  srcWatcher
    .on('add', (path) => {
      transform(path)
        .then(() => log(`File ${path} has been added`))
        .catch(err => error(`error while transforming:\n${err}\n`))
    })
    .on('change', (path) => {
      transform(path)
        .then(() => log(`File ${path} has been changed`))
        .catch(err => error(`error while transforming:\n${err}\n`))
    })
    .on('unlink', (path) => {
      unlink(path)
        .then(() => log(`File ${path} has been deleted`))
        .catch(err => error(`error while deleting:\n${err}\n`))
    })
    .on('error', (err) => {
      const msg = `Watcher error: ${err}`
      error(msg)
      reject(msg)
    })
    .on('ready', () => {
      resolve('First run is complete.\nListening for changes...')
    })
})

module.exports = runWatchSrc
