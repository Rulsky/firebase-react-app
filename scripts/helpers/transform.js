const { outputFile } = require('fs-extra')

const transformFile = require('./transformFile')
const { functionsDir } = require('../../config/constants')


const transform = path => transformFile(path)
  .then((res) => {
    console.log('tf result', res)
  })
  .catch(err => console.log(err))

module.exports = transform
