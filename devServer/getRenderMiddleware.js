require('@babel/register')(require('../config/babel.conf.server'))
const { RENDER_MIDDLEWARE_PATH } = require('../config/constants')

/* eslint-disable import/no-dynamic-require, global-require */
module.exports = () => {
  try {
    return require(RENDER_MIDDLEWARE_PATH).default
  } catch (error) {
    return (req, res, next) => { next() }
  }
}
