const applyProxies = require('../applyProxies')

describe('applyProxies', () => {
  const proxyMiddleware = jest.fn()
  const app = {
    use: jest.fn(),
  }
  it('call with simple config', () => {
    const listOfProxies = {
      '/test': '/someApi',
      '/endpoint': '/otherUsefulThing',
      '/rest': '/rest/v2/',
    }

    applyProxies(app, proxyMiddleware, listOfProxies)

    expect(app.use).toHaveBeenCalledTimes(3)
    expect(proxyMiddleware).toHaveBeenNthCalledWith(1, '/test', { target: '/someApi' })
    expect(proxyMiddleware).toHaveBeenNthCalledWith(2, '/endpoint', { target: '/otherUsefulThing' })
    expect(proxyMiddleware).toHaveBeenNthCalledWith(3, '/rest', { target: '/rest/v2/' })
  })

  it('call with complex config', () => {
    const case1 = {
      target: 'your/point',
      changeOrigin: true,
    }
    const case2 = {
      target: 'http://www.icann.org',
      pathRewrite: {
        '^/api/old-path': '/api/new-path',
        '^/api/remove/path': '/path',
      },
    }
    const listOfProxies = {
      '/my/point': case1,
      'some/endpoint': case2,
    }

    applyProxies(app, proxyMiddleware, listOfProxies)

    expect(proxyMiddleware).toHaveBeenNthCalledWith(1, '/my/point', case1)
    expect(proxyMiddleware).toHaveBeenNthCalledWith(2, 'some/endpoint', case2)
  })

  it('error throwing if wrong config', () => {
    const listOfProxies = {
      wrong: 2342,
    }
    expect(() => {
      applyProxies(app, proxyMiddleware, listOfProxies)
    }).toThrowError(/each memeber of "proxy" config object must be string or object/)
  })
})
