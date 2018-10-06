const { join } = require('path')


describe('isStatic', () => {
  let isStatic

  beforeEach(() => {
    jest.mock('../../config/constants')
    isStatic = require('../isStatic') // eslint-disable-line global-require
  })

  it('the file is not from static dir', () => {
    const given = join(process.cwd(), 'src', 'components', 'App.jsx')
    expect(isStatic(given)).toEqual(false)
  })

  it('the file is from static dir', () => {
    const given = join(process.cwd(), 'static', 'img', 'hero.png')
    expect(isStatic(given)).toEqual(true)
  })
})
