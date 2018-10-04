it('buildBundle', () => {
  jest.mock('../../config/webpack.prod.config.js', () => 'this is a mock of the webpack config')
  jest.mock('webpack', () => jest.fn(() => ({ run: jest.fn() })))

  const buildBundle = require('../buildBundle') // eslint-disable-line global-require
  const webpack = require('webpack') // eslint-disable-line global-require

  buildBundle()

  expect(webpack).toHaveBeenCalledWith('this is a mock of the webpack config')
  expect(webpack).toHaveBeenCalledTimes(1)
})
