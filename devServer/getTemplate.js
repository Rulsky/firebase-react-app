require('@babel/register')(require('../config/babel.conf.server'))
const { TEMPLATE_PATH } = require('../config/constants')

/* eslint-disable import/no-dynamic-require, global-require */
module.exports = () => {
  try {
    return require(TEMPLATE_PATH).default
  } catch (error) {
    return require('./template')
  }
}
