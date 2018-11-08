import template from '@rulsky/firebase-react-app/devServer/template'

import renderMiddleware from './renderMiddleware'

export default (app, path = '/') => {
  app.use(path, renderMiddleware)

  app.use(path, (req, res) => {
    const {
      fra: {
        headContent, appMarkup, title, bottomContent,
      },
    } = res.locals
    const html = template(headContent, appMarkup, bottomContent, title)
    res.send(html)
  })
  return app
}
