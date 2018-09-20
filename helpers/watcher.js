const { watch } = require('chokidar')

const { log, error } = require('./logger')
const unlink = require('./unlink')
const handleFiles = require('./handleFiles')
const { watchList, ignored, rootPackage } = require('../config/constants')

const watcher = ({ yarn }) => new Promise((resolve, reject) => watch(watchList, { ignored })
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
