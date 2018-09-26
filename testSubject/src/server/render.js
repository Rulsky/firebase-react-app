import template from '@rulsky/firebase-react-app/devServer/template'

import renderMiddleware from './renderMiddleware'

export default (app, path = '/') => {
  app.use(path, renderMiddleware)

  app.use(path, (req, res) => {
    const {
      fra: {
        headContent, appMarkup, bottomContent, title,
      },
    } = res.locals
    const bottom = `${bottomContent}\n<script type="text/javascript" src="bundle.js"><script/>`
    const html = template(headContent, appMarkup, bottom, title)
    res.send(html)
  })
  return app
}
