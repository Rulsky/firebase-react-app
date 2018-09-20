const applyProxies = (app, proxyMiddleware, proxies) => {
  Object.keys(proxies).forEach((path) => {
    const proxyParams = proxies[path]
    if (typeof proxyParams === 'string') {
      const params = { target: proxyParams }
      app.use(proxyMiddleware(path, params))
    } else if (typeof proxyParams === 'object') {
      app.use(proxyMiddleware(path, proxyParams))
    } else {
      throw new TypeError('each memeber of "proxy" config object must be string or object. Go to https://github.com/chimurai/http-proxy-middleware#http-proxy-options for details ')
    }
  })
}

module.exports = applyProxies
