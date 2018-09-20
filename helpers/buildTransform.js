const { watch } = require('chokidar')

const { log, error } = require('./logger')
const { ignored, watchList } = require('../config/constants')
const handleFiles = require('./handleFiles')

const watcher = () => new Promise((resolve, reject) => {
  const wt = watch(watchList, { ignored })
    .on('add', file => handleFiles(file))
    .on('error', (err) => {
      const msg = `Watcher error: ${err}`
      error(msg)
      reject(msg)
    })
    .on('ready', () => {
      const msg = '\nTranspilation is complete.\n'
      log(msg)
      resolve(wt)
    })
})

module.exports = watcher
