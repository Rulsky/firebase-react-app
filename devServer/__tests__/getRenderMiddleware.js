describe('getRenderMiddleware', () => {
  beforeEach(() => {
    jest.mock('../../config/constants')
  })
  /* eslint-disable global-require */
  it('returns empty middleware function if nothing was found on given path', () => {
    const getRenderMiddleware = require('../getRenderMiddleware')
    const expected = new RegExp(/\(req,\s*res,\s*next\)\s*=>\s*{(\s*.*\s*)*next().*\s*}/, 'gim')
    expect(getRenderMiddleware().toString()).toMatch(expected)
  })

  it('returns provided middleware', () => {
    const expected = new RegExp(/\(req,\s*res,\s*next\)\s*=>\s*{\s*res\.locals\.fra = 'keep going';\s*next\(\);\s*}/, 'gim')

    const getRenderMiddleware = require('../getRenderMiddleware')
    expect(getRenderMiddleware().toString()).toMatch(expected)
  })
})
