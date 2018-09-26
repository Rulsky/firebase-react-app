import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import App from '../components'

export default (req, res, next) => {
  const sheet = new ServerStyleSheet()
  const appMarkup = renderToString(sheet.collectStyles(<App />))
  const styleTags = sheet.getStyleTags()

  const fra = {
    appMarkup,
    headContent: `<meta name="author" content="Ruslan Zaytsev">${styleTags}`,
    bottomContent: '',
    title: 'test subject 01',
  }
  res.locals.fra = fra

  next()
}
