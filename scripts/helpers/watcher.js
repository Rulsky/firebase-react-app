const { join } = require('path')
const { watch } = require('chokidar')

const { log, error } = require('./logger')
const transform = require('./transform')
const unlink = require('./unlink')
const handleDeps = require('./handleDeps')
const { SRC_DIR } = require('../../config/constants')

const rootPackage = join(process.cwd(), 'package.json')
const src = join(SRC_DIR, '**')
const watchList = [rootPackage, src]

const handleFiles = (file, yarn) => {
  if (file === rootPackage) {
    return handleDeps(yarn)
      .then((result) => {
        if (result) {
          log('Deps have been changed')
        } else {
          log('No new Deps')
        }
      })
      .catch(err => error(`error while handling new dependencies:\n${err}\n`))
  }
  return transform(file)
    .then(() => log(`File ${file} has been changed`))
    .catch(err => error(`error while transforming:\n${err}\n`))
}

const watcher = ({ yarn }) => new Promise((resolve, reject) => watch(watchList)
  .on('change', file => handleFiles(file, yarn))
  .on('add', file => handleFiles(file, yarn))
  .on('unlink', (file) => {
    if (file !== rootPackage) {
      unlink(file)
        .then(() => log(`File ${file} has been deleted`))
        .catch(err => error(`error while deleting:\n${err}\n`))
    }
  })
  .on('error', (err) => {
    const msg = `Watcher error: ${err}`
    error(msg)
    reject(msg)
  })
  .on('ready', () => {
    const msg = 'First run of transpilation is complete.\nListening for changes...'
    log(msg)
    resolve(msg)
  }))

module.exports = watcher
