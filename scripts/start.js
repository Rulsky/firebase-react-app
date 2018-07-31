const { join } = require('path')
const { watch } = require('chokidar')

const { transform } = require('./helpers')

const src = join(process.cwd(), 'src', '**')

const { log, info, error } = console


module.exports = () => {
  const srcWatcher = watch(src)
  srcWatcher
    .on('add', (path) => {
      log(`File ${path} has been added`)
      transform(path)
    })
    .on('change', (path) => {
      log(`File ${path} has been changed`)
      transform(path)
    })
    .on('unlink', (path) => {
      // removeSync(outputName(path, srcDir, firebaseFunctionsDir))
      log(`File ${path} has been removed`)
    })
    .on('error', err => error(`Watcher error: ${err}`))
    .on('ready', () => info('First run is complete.\nListening for changes...'))
  // console.log('this is your start script from fra2')
}
