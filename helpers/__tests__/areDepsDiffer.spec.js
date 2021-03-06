const { join } = require('path')

/* eslint-disable global-require */
describe('areDepsDiffer', () => {
  beforeEach(() => {
    jest.mock('../../config/constants')
  })

  describe('random order', () => {
    it('case 1 - should be return false', () => {
      jest.mock(join(process.cwd(), 'package.json'), () => ({
        dependencies: {
          three: '~3.3.3',
          one: '^0.0.1',
          two: '0.0.2',
        },
      }))
      jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
        dependencies: {
          one: '^0.0.1',
          two: '0.0.2',
          three: '~3.3.3',
        },
      }),
      { virtual: true })

      const areDepsDiffer = require('../areDepsDiffer')
      expect(areDepsDiffer()).toEqual(false)
    })

    it('case 2 - should be return false', () => {
      jest.mock(join(process.cwd(), 'package.json'), () => ({
        dependencies: {
          two: '0.0.2',
          one: '^0.0.1',
          localDep: 'file:../../ProjDir',
          three: '~3.3.3',
        },
      }))
      jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
        dependencies: {
          three: '~3.3.3',
          localDep: 'file:../../../ProjDir',
          two: '0.0.2',
          one: '^0.0.1',
        },
      }),
      { virtual: true })

      const areDepsDiffer = require('../areDepsDiffer')
      expect(areDepsDiffer()).toEqual(false)
    })

    it('case 2 - should be return true', () => {
      jest.mock(join(process.cwd(), 'package.json'), () => ({
        dependencies: {
          one: '^0.0.1',
          two: '0.0.2',
        },
      }))
      jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
        dependencies: {
          one: '~0.0.1',
          two: '0.0.2',
          localDep: 'file:../../../someModule',
        },
      }),
      { virtual: true })

      const areDepsDiffer = require('../areDepsDiffer')
      expect(areDepsDiffer()).toEqual(true)
    })
  })

  describe('different versions of same dependency', () => {
    it('case 1 - should be return true', () => {
      jest.mock(join(process.cwd(), 'package.json'), () => ({
        dependencies: {
          one: '^0.0.1',
          two: '0.0.2',
        },
      }))
      jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
        dependencies: {
          one: '^0.0.1',
          two: '0.0.3',
          localDep: 'file:../../../someModule',
        },
      }),
      { virtual: true })

      const areDepsDiffer = require('../areDepsDiffer')
      expect(areDepsDiffer()).toEqual(true)
    })

    it('case 2 - should be return true', () => {
      jest.mock(join(process.cwd(), 'package.json'), () => ({
        dependencies: {
          one: '^0.0.1',
          two: '0.0.2',
        },
      }))
      jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
        dependencies: {
          one: '~0.0.1',
          two: '0.0.2',
          localDep: 'file:../../../someModule',
        },
      }),
      { virtual: true })

      const areDepsDiffer = require('../areDepsDiffer')
      expect(areDepsDiffer()).toEqual(true)
    })
  })

  describe('source-map-support and this package handling', () => {
    it('should be return false', () => {
      jest.mock(join(process.cwd(), 'package.json'), () => ({
        dependencies: {
          husky: '^1.1.2',
          jest: '^23.5.0',
        },
      }))
      jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
        dependencies: {
          'source-map-support': '^0.59.0',
          '@rulsky/firebase-react-app': '0.20.2',
          husky: '^1.1.2',
          jest: '^23.5.0',
        },
      }),
      { virtual: true })

      const areDepsDiffer = require('../areDepsDiffer')
      expect(areDepsDiffer()).toEqual(false)
    })
  })

  describe('aware about dependencies from file system', () => {
    describe('path starts with "file:"', () => {
      it('case when all deps are same - should be return false', () => {
        jest.mock(join(process.cwd(), 'package.json'), () => ({
          dependencies: {
            one: '^0.0.1',
            two: '0.0.2',
            localDep: 'file:../../someModule',
          },
        }))
        jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
          dependencies: {
            one: '^0.0.1',
            two: '0.0.2',
            localDep: 'file:../../../someModule',
          },
        }),
        { virtual: true })

        const areDepsDiffer = require('../areDepsDiffer')
        expect(areDepsDiffer()).toEqual(false)
      })

      it('case when deps are different - should be return true', () => {
        jest.mock(join(process.cwd(), 'package.json'), () => ({
          dependencies: {
            one: '^0.0.1',
            two: '0.0.2',
            localDep: 'file:../../someModule',
          },
        }))
        jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
          dependencies: {
            one: '^0.0.1',
            two: '1.0.2',
            localDep: 'file:../../../someModule',
          },
        }),
        { virtual: true })

        const areDepsDiffer = require('../areDepsDiffer')
        expect(areDepsDiffer()).toEqual(true)
      })
    })


    describe('path starts with "./" or "../"', () => {
      it('case when all deps are same - should be return false', () => {
        jest.mock(join(process.cwd(), 'package.json'), () => ({
          dependencies: {
            one: '^0.0.1',
            two: '0.0.2',
            localDep: '../someModule',
          },
        }))
        jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
          dependencies: {
            one: '^0.0.1',
            two: '0.0.2',
            localDep: '../../someModule',
          },
        }),
        { virtual: true })

        const areDepsDiffer = require('../areDepsDiffer')
        expect(areDepsDiffer()).toEqual(false)
      })

      it('case when deps are different - should return true', () => {
        jest.mock(join(process.cwd(), 'package.json'), () => ({
          dependencies: {
            one: '^0.0.1',
            two: '0.0.3',
            localDep: './someModule',
          },
        }))
        jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
          dependencies: {
            one: '^0.0.1',
            two: '1.5.2',
            localDep: '../someModule',
          },
        }),
        { virtual: true })

        const areDepsDiffer = require('../areDepsDiffer')
        expect(areDepsDiffer()).toEqual(true)
      })
    })
  })
  describe('coverage satisfaction', () => {
    it('case 1 - should be return false', () => {
      jest.mock(join(process.cwd(), 'package.json'), () => ({
        dependencies: {
          one: '^0.0.1',
          two: '0.0.2',
          localDep: 'file:../../someModule',
          cs: false,
        },
      }))
      jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
        dependencies: {
          one: '^0.0.1',
          two: '0.0.2',
          localDep: 'file:../../../someModule',
          cs: false,
        },
      }),
      { virtual: true })

      const areDepsDiffer = require('../areDepsDiffer')
      expect(areDepsDiffer()).toEqual(false)
    })

    it('case 2 - should return true', () => {
      jest.mock(join(process.cwd(), 'package.json'), () => ({
        dependencies: {
          one: '^0.0.1',
          two: '0.0.2',
          cs: false,
        },
      }))
      jest.mock(join(process.cwd(), 'functions', 'package.json'), () => ({
        dependencies: {
          one: '^0.0.1',
          two: '0.0.2',
          cs: true,
        },
      }),
      { virtual: true })

      const areDepsDiffer = require('../areDepsDiffer')
      expect(areDepsDiffer()).toEqual(true)
    })
  })

  describe('errors', () => {
    it('when no functions dir', () => {
      const areDepsDiffer = require('../areDepsDiffer')
      expect(areDepsDiffer()).toEqual(true)
    })

    it('unexpected', () => {
      jest.mock(join(process.cwd(), 'package.json'), () => ('surprise!'))
      const areDepsDiffer = require('../areDepsDiffer')
      expect(() => { areDepsDiffer() }).toThrow()
    })
  })
})
