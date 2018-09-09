const { join } = require('path')
const getFraConfig = require('../../helpers/getFraConfig')

const rootPackagePath = join(process.cwd(), 'package.json')

describe('getFraConfig', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  it('returns null if neither ".frarc" and no "fra" field in package.json', () => {
    jest.mock(rootPackagePath, () => ({
      name: 'test-stub',
      version: '2.3.8',
    }), { virtual: true })
    expect(getFraConfig()).toEqual(null)
  })

  it('returns config out of "fra" property in package.json', () => {
    const mockData = {
      mySweetConfig: 'isAweasome',
      otherProperty: 'anotherValue',
    }
    jest.mock(rootPackagePath, () => ({
      name: 'test-stub',
      version: '2.3.8',
      fra: mockData,
    }), { virtual: true })
    expect(getFraConfig()).toEqual(mockData)
  })
})

describe('reads config out of ".frarc.json" file', () => {
  it('reads config out of ".frarc.json" file', () => {
    const mockData = {
      exclude: '**/__tests__/**',
      babel: {
        presets: [
          ['@babel/preset-stage-0', {
            useBuiltIns: true,
          }],
        ],
      },
    }
    jest.mock(rootPackagePath, () => ({ val: true }), { virtual: true })
    jest.mock(join(process.cwd(), '.frarc.json'), () => mockData, { virtual: true })

    expect(getFraConfig()).toEqual(mockData)
  })
})
