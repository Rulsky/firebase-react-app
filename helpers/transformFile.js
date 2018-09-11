const { transformFile } = require('@babel/core')
const babelConfig = require('../config/babel.conf.server')

const transformFilePromisified = path => new Promise(
  (resolve, reject) => transformFile(path, babelConfig, (err, result) => {
    if (err) return reject(err)
    return resolve(result)
  })
)

module.exports = transformFilePromisified
