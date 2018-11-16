const spawn = require('cross-spawn')

const { info } = require('./logger')

const serveFirebase = () => {
  info('\nstarting firebase emulation\n')
  return spawn('npx', ['firebase', 'serve', '--only', 'hosting,functions'], { stdio: 'inherit' })
}

module.exports = serveFirebase
