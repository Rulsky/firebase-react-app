const { join } = require('path')
/* eslint-disable global-require */
describe('areDepsDiffer', () => {
  beforeEach(() => {
    jest.mock('../../../config/constants')
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

      const areDepsDiffer = require('../../../scripts/helpers/areDepsDiffer')
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

      const areDepsDiffer = require('../../../scripts/helpers/areDepsDiffer')
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

      const areDepsDiffer = require('../../../scripts/helpers/areDepsDiffer')
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

      const areDepsDiffer = require('../../../scripts/helpers/areDepsDiffer')
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

      const areDepsDiffer = require('../../../scripts/helpers/areDepsDiffer')
      expect(areDepsDiffer()).toEqual(true)
    })
  })

  describe('aware about dependencies form file system', () => {
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

      const areDepsDiffer = require('../../../scripts/helpers/areDepsDiffer')
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

      const areDepsDiffer = require('../../../scripts/helpers/areDepsDiffer')
      expect(areDepsDiffer()).toEqual(true)
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

      const areDepsDiffer = require('../../../scripts/helpers/areDepsDiffer')
      expect(areDepsDiffer()).toEqual(false)
    })

    it('case 2 - should be return true', () => {
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

      const areDepsDiffer = require('../../../scripts/helpers/areDepsDiffer')
      expect(areDepsDiffer()).toEqual(true)
    })
  })
})
