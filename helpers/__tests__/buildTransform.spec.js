const { join } = require('path')

describe('buildTransform', () => {
  beforeEach(() => {
    jest.mock('../../config/constants')
  })
  /* eslint-disable global-require */
  it('at lest something to cover', () => {
    jest.mock('chokidar')
    const chokidar = require('chokidar')
    const watch = jest.fn()
    chokidar.watch = watch

    const buildTransform = require('../buildTransform')
    buildTransform()

    expect(watch).toHaveBeenCalledTimes(1)
    expect(watch).toHaveBeenCalledWith(
      [
        join(process.cwd(), 'package.json'),
        join(process.cwd(), 'src', '**'),
        join(process.cwd(), 'static', '**'),
      ],
      { ignored: ['**/__spec__/**', '**/__specs__/**', '**/__test__/**', '**/__tests__/**', '**/__mocks__/**', '*.test.js', '*.spec.js'] }
    )
  })
})
