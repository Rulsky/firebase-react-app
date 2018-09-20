const express = require('express')
const wdm = require('webpack-dev-middleware')
const whm = require('webpack-hot-middleware')
const webpack = require('webpack')
const httpProxyMiddleware = require('http-proxy-middleware')

const { PORTS, FRA_CONFIG } = require('../config/constants')
const wpConfig = require('../config/webpack.dev.config')
const applyProxies = require('./applyProxies')


const proxies = Object.assign({ '/api': `http://localhost:${PORTS.emulator}` }, FRA_CONFIG.proxy)

const app = express()
const compiler = webpack(wpConfig)
const { log } = console

app.use(wdm(compiler, {
  writeToDisk: true,
  logLevel: 'warn',
}))
app.use(whm(compiler))
applyProxies(app, httpProxyMiddleware, proxies)

// TODO add ssr middleware
// TODO remove html-webpack-plugin

app.listen(PORTS.devServer, () => log(`express WHM on http://localhost:${PORTS.devServer}`))
