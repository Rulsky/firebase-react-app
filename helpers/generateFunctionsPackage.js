const { join, sep } = require('path')
const { readJson, outputFile } = require('fs-extra')

const { error } = require('./logger')
const deepenRelativePath = require('./deepenRelativePath')
const { FUNCTIONS_DIR } = require('../config/constants')
const fraPackage = require('../package.json')

const { version } = fraPackage
const SMSV = fraPackage.dependencies['source-map-support']

const template = {
  name: 'functions',
  description: 'Cloud Functions for Firebase',
  scripts: {
    serve: 'firebase serve --only functions',
    shell: 'firebase functions:shell',
    start: 'npm run shell',
    deploy: 'firebase deploy --only functions',
    logs: 'firebase functions:log',
  },
  private: true,
}

const rootPackageJson = join(process.cwd(), 'package.json')
const functionsPackageJson = join(FUNCTIONS_DIR, 'package.json')

const generateFunctionsPackage = () => readJson(rootPackageJson)
  .then(({ dependencies, engines }) => {
    const content = Object.assign({}, template, {
      engines,
      dependencies: Object.assign({},
        {
          'source-map-support': SMSV,
          '@rulsky/firebase-react-app': version,
        },
        deepenRelativePath(dependencies)),
    })
    return JSON.stringify(content, null, 2)
  })
  .then(content => outputFile(functionsPackageJson, content))
  .catch(err => error(
    `error while generating 'package.json' in\n${FUNCTIONS_DIR}${sep}package.json:\n`,
    err
  ))

module.exports = generateFunctionsPackage
