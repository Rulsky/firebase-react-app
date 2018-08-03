const { sync } = require('cross-spawn')

const serveFirebase = () => sync('npx', ['firebase', 'serve'])

module.exports = serveFirebase
