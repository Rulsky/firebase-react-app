const { join } = require('path')

/* eslint-disable global-require */
describe('genterateFunctionsPackage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    jest.mock('fs-extra')
  })
  it('copies dependencies from root "package.json"', () => {
    const givenFilename = join(process.cwd(), 'package.json')
    const givenContent = JSON.stringify({
      name: 'fra-consumer',
      version: '1.2.0',
      description: '',
      main: 'index.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
      },
      keywords: [],
      author: '',
      license: 'ISC',
      devDependencies: {
        eslint: '^4.19.1',
        'eslint-config-airbnb': '^17.0.0',
        'eslint-plugin-import': '^2.13.0',
        'eslint-plugin-jsx-a11y': '^6.1.1',
        'eslint-plugin-react': '^7.10.0',
        'firebase-tools': '^4.0.1',
        '@babel/core': '^7.0.0-beta.55',
        '@babel/preset-env': '^7.0.0-beta.55',
        '@babel/preset-react': '^7.0.0-beta.55',
      },
      dependencies: {
        'graphql-tools': 'latest',
        'firebase-admin': '^5.13.1',
        'firebase-functions': '^2.0.2',
        react: '^16.4.1',
        'react-dom': '^16.4.1',
        'some-other-cool-lib': '~2.40.12',
      },
    }, null, 2)

    const expectedFilename = join(process.cwd(), 'functions', 'package.json')
    const expectedConent = JSON.stringify({
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
      dependencies: {
        'graphql-tools': 'latest',
        'firebase-admin': '^5.13.1',
        'firebase-functions': '^2.0.2',
        react: '^16.4.1',
        'react-dom': '^16.4.1',
        'some-other-cool-lib': '~2.40.12',
      },
    }, null, 2)

    require('fs-extra').__addToRegister(givenFilename, givenContent)
    const { generateFunctionsPackage } = require('../../../scripts/helpers')

    return generateFunctionsPackage().then(({ filename, content }) => {
      expect(filename).toEqual(expectedFilename)
      expect(content).toEqual(expectedConent)
    })
  })
  it('error handling', () => {
    const givenFilename = join(process.cwd(), 'package.json')
    console.error = jest.fn() // eslint-disable-line no-console
    require('fs-extra').__addToRegister(givenFilename, 'blabla')
    const { generateFunctionsPackage } = require('../../../scripts/helpers')
    return generateFunctionsPackage().catch((error) => {
      expect(error.message).toMatch(/error while generating'/)
      expect(console.error).toHaveBeenCalledTimes(1) // eslint-disable-line no-console
    })
  })
})
