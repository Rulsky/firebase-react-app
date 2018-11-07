const makeEntry = require('../makeEntry')

describe('makeEntry', () => {
  describe('with one argument', () => {
    it('string', () => {
      expect(makeEntry('someStr')).toEqual('someStr')
    })

    it('array', () => {
      expect(makeEntry(['someStr', 'otherStr'])).toEqual(['someStr', 'otherStr'])
    })

    it('object', () => {
      expect(makeEntry({
        client: './scr/client/index.js',
        admin: './scr/client/admin.js',
        cms: './scr/client/cms.js',
      })).toEqual({
        client: './scr/client/index.js',
        admin: './scr/client/admin.js',
        cms: './scr/client/cms.js',
      })
    })
  })

  describe('with second argument', () => {
    const secondArg = 'supposedToBeAnWhm'
    it('string', () => {
      expect(makeEntry('someStr', secondArg)).toEqual(['someStr', secondArg])
    })

    it('array', () => {
      expect(makeEntry(['someStr', 'otherStr'], secondArg)).toEqual(['someStr', 'otherStr', secondArg])
    })

    it('object', () => {
      expect(makeEntry({
        client: './scr/client/index.js',
        admin: './scr/client/admin.js',
        cms: './scr/client/cms.js',
      }, secondArg)).toEqual({
        client: ['./scr/client/index.js', secondArg],
        admin: ['./scr/client/admin.js', secondArg],
        cms: ['./scr/client/cms.js', secondArg],
      })
    })
  })
})
