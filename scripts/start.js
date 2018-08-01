const { join } = require('path')
const { watch } = require('chokidar')

const { SRC_DIR } = require('../config/constants')
const { transform, unlink } = require('./helpers')

const src = join(SRC_DIR, '**')

const { log, info, error } = console


module.exports = () => {
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
    .on('error', err => error(`Watcher error: ${err}`))
    .on('ready', () => info('First run is complete.\nListening for changes...'))
}
