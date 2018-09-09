const parseCommanderOptions = require('../../helpers/parseCommanderOptions')

describe('parseCommanderOptions', () => {
  describe('on command', () => {
    it('case 1: several options', () => {
      const given = {
        ginger: true,
        buckwheat: false,
        parent: {},
      }
      expect(parseCommanderOptions(given, 'ginger', 'buckwheat')).toEqual({
        ginger: true,
        buckwheat: true,
      })
    })

    it('case 2: one is missing', () => {
      const given = {
        pear: true,
        cucumber: false,
        parent: {},
      }
      expect(parseCommanderOptions(given, 'pear', 'cucumber', 'cabbage')).toEqual({
        pear: true,
        cucumber: true,
      })
    })
  })

  describe('on parent', () => {
    it('case 1: several options', () => {
      const given = {
        parent: {
          coffee: true,
          tee: false,
        },
      }
      expect(parseCommanderOptions(given, 'coffee', 'tee')).toEqual({
        coffee: true,
        tee: true,
      })
    })

    it('case 2: one is missing', () => {
      const given = {
        parent: {
          orange: true,
          apple: false,
        },
      }
      expect(parseCommanderOptions(given, 'orange', 'apple', 'carrot')).toEqual({
        orange: true,
        apple: true,
      })
    })

    it('case 3: nothing', () => {
      const given = {
        parent: {},
      }
      expect(parseCommanderOptions(given, 'orange', 'apple', 'carrot')).toEqual({})
    })
  })


  describe('mixed', () => {
    it('case 1: several options', () => {
      const given = {
        ginger: true,
        buckwheat: false,
        parent: {
          pear: true,
          cucumber: false,
        },
      }
      expect(parseCommanderOptions(given, 'ginger', 'buckwheat', 'pear', 'cucumber')).toEqual({
        ginger: true,
        buckwheat: true,
        pear: true,
        cucumber: true,
      })
    })

    it('case 2: one is missing', () => {
      const given = {
        pear: true,
        ginger: false,
        parent: {
          cucumber: false,
          buckwheat: true,
        },
      }
      expect(parseCommanderOptions(given, 'pear', 'ginger', 'cucumber', 'buckwheat', 'cabbage')).toEqual({
        pear: true,
        cucumber: true,
        ginger: true,
        buckwheat: true,
      })
    })
  })

  describe('error throwing', () => {
    it('the first lookup elem is wrong', () => {
      expect(() => {
        parseCommanderOptions({}, [])
      }).toThrow()
    })

    it('the fourth lookup elem is wrong', () => {
      expect(() => {
        parseCommanderOptions({}, 'banana', 'sun', 'sea', {})
      }).toThrow()
    })

    describe('first argument must be an object', () => {
      it('array as the first arg', () => {
        expect(() => {
          parseCommanderOptions([], 'trees', 'hike', 'camping')
        }).toThrow()
      })
      it('string as the first arg', () => {
        expect(() => {
          parseCommanderOptions('first', 'trees', 'hike', 'camping')
        }).toThrow()
      })
    })
  })
})
