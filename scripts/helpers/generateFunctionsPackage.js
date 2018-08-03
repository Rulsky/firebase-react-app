const { join, sep } = require('path')
const { readJson, outputFile } = require('fs-extra')

const { FUNCTIONS_DIR } = require('../../config/constants')
const deepenRelativePath = require('./deepenRelativePath')

const { error } = console
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
  .then((json) => {
    if (typeof json === 'object') return json
    return JSON.parse(json)
  })
  .then(({ dependencies }) => {
    const content = Object.assign({}, template, {
      dependencies: deepenRelativePath(dependencies),
    })
    return JSON.stringify(content, null, 2)
  })
  .then(content => outputFile(functionsPackageJson, content))
  .catch(err => error(
    `error while generating 'package.json' in\n${FUNCTIONS_DIR}${sep}package.json:\n`,
    err
  ))

module.exports = generateFunctionsPackage
