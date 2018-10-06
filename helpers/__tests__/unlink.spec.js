const { join } = require('path')

describe('unlink', () => {
  let unlink
  beforeEach(() => {
    jest.mock('../../config/constants')
    jest.mock('fs-extra')
    unlink = require('../unlink') // eslint-disable-line global-require
  })
  it('scr file', () => {
    const given = join(process.cwd(), 'src', 'components', 'App.jsx')
    const expected = join(process.cwd(), 'functions', 'components', 'App.js')
    return unlink(given).then((result) => {
      expect(result).toEqual(expected)
    })
  })

  it('static file', () => {
    const given = join(process.cwd(), 'static', 'images', 'pic.jpg')
    const expected = join(process.cwd(), 'public', 'images', 'pic.jpg')
    return unlink(given).then((result) => {
      expect(result).toEqual(expected)
    })
  })
})
