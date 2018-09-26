const express = require('express')
const wdm = require('webpack-dev-middleware')
const whm = require('webpack-hot-middleware')
const webpack = require('webpack')
const httpProxyMiddleware = require('http-proxy-middleware')

const { PORTS, FRA_CONFIG } = require('../config/constants')
const wpConfig = require('../config/webpack.dev.config')
const applyProxies = require('./applyProxies')
const template = require('./template')
const assetsToStrings = require('./assetsToStrings')
const getRenderMiddleware = require('./getRenderMiddleware')

const renderMiddleware = getRenderMiddleware()

const ds = () => {
  const proxies = Object.assign({ '/api': `http://localhost:${PORTS.emulator}` }, FRA_CONFIG.proxy)

  const app = express()
  const compiler = webpack(wpConfig)
  const { log } = console

  app.use(wdm(compiler, {
    writeToDisk: true,
    logLevel: 'warn',
    serverSideRender: true,
  }))
  app.use(whm(compiler))
  applyProxies(app, httpProxyMiddleware, proxies)
  app.use(renderMiddleware)
  app.use((req, res) => {
    const { assetsByChunkName } = res.locals.webpackStats.toJson()

    let scripts = assetsToStrings(assetsByChunkName)
    let head
    let content
    let title = 'still in dev'
    if (res.locals.fra) {
      title = res.locals.fra.title || title
      head = res.locals.fra.headContent || ''
      content = res.locals.fra.appMarkup || ''
      scripts = `${res.locals.fra.bottomContent}\n${scripts}`
    }
    res.send(template(head, content, scripts, title))
  })

  app.listen(PORTS.devServer, () => log(`express WHM on http://localhost:${PORTS.devServer}`))
}

module.exports = ds
