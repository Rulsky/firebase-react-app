const { join } = require('path')

/* eslint-disable global-require */
describe('destFilename', () => {
  beforeEach(() => {
    jest.mock('../../config/constants')
  })
  describe('replaces directories with preservation of relative paths', () => {
    it('case 1', () => {
      const destFilename = require('../destFilename')
      const given = join(process.cwd(), 'src/shared/stuff/file.js')
      const expected = join(process.cwd(), 'functions/shared/stuff/file.js')
      expect(destFilename(given)).toEqual(expected)
    })

    it('case 2', () => {
      const destFilename = require('../destFilename')
      const given = join(process.cwd(), 'src/components/App.js')
      const expected = join(process.cwd(), 'functions/components/App.js')
      expect(destFilename(given)).toEqual(expected)
    })
  })

  describe("replace extension of the file with '.js'", () => {
    it('case 1', () => {
      const destFilename = require('../destFilename')
      const given = join(process.cwd(), 'src/components/App.jsx')
      const expected = join(process.cwd(), 'functions/components/App.js')
      expect(destFilename(given)).toEqual(expected)
    })

    it('case 2', () => {
      const destFilename = require('../destFilename')
      const given = join(process.cwd(), 'src/server/db/DAO/dataloade.blablabla')
      const expected = join(process.cwd(), 'functions/server/db/DAO/dataloade.js')
      expect(destFilename(given)).toEqual(expected)
    })

    it('filename case sensivity', () => {
      const destFilename = require('../destFilename')
      const given = join(process.cwd(), 'src/shared/components/File.tsx')
      const expected = join(process.cwd(), 'functions/shared/components/File.js')
      expect(destFilename(given)).toEqual(expected)
    })
  })
})
