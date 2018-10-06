const { join } = require('path')

/* eslint-disable global-require */
describe('destFilename', () => {
  let destFilename
  beforeEach(() => {
    jest.mock('../../config/constants')
    destFilename = require('../destFilename')
  })
  describe('replaces directories with preservation of relative paths', () => {
    it('case 1', () => {
      const given = join(process.cwd(), 'src/shared/stuff/file.js')
      const expected = join(process.cwd(), 'functions/shared/stuff/file.js')
      expect(destFilename(given)).toEqual(expected)
    })

    it('case 2', () => {
      const given = join(process.cwd(), 'src/components/App.js')
      const expected = join(process.cwd(), 'functions/components/App.js')
      expect(destFilename(given)).toEqual(expected)
    })
  })

  describe("replace extension of the file with '.js'", () => {
    it('case 1', () => {
      const given = join(process.cwd(), 'src/components/App.jsx')
      const expected = join(process.cwd(), 'functions/components/App.js')
      expect(destFilename(given)).toEqual(expected)
    })

    it('case 2', () => {
      const given = join(process.cwd(), 'src/server/db/DAO/dataloade.blablabla')
      const expected = join(process.cwd(), 'functions/server/db/DAO/dataloade.js')
      expect(destFilename(given)).toEqual(expected)
    })

    it('filename case sensivity', () => {
      const given = join(process.cwd(), 'src/shared/components/File.tsx')
      const expected = join(process.cwd(), 'functions/shared/components/File.js')
      expect(destFilename(given)).toEqual(expected)
    })
  })

  describe('non default arguments', () => {
    it('case 1', () => {
      const given = join(process.cwd(), 'static/img/covers/hero1.png')
      const expected = join(process.cwd(), 'public/img/covers/hero1.png')
      expect(destFilename(
        given,
        join(process.cwd(), 'static'),
        join(process.cwd(), 'public')
      )).toEqual(expected)
    })

    it('case 2', () => {
      const given = join(process.cwd(), 'gen/fonts/customFont.ttf')
      const expected = join(process.cwd(), 'dist/fonts/customFont.ttf')
      expect(destFilename(
        given,
        join(process.cwd(), 'gen'),
        join(process.cwd(), 'dist')
      )).toEqual(expected)
    })
  })
})
