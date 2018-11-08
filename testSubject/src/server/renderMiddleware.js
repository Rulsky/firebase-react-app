import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import App from '../components'
import CMS from '../components/cms'

export default (req, res, next) => {
  const sheet = new ServerStyleSheet()
  let appMarkup
  let styleTags
  let headContent
  let title
  let bottomContent
  if (req.url.indexOf('/cms') === 0) {
    appMarkup = renderToString(sheet.collectStyles(<CMS />))
    styleTags = sheet.getStyleTags()
    headContent = `<meta name="author" content="Ruslan Zaytsev">\n${styleTags}`
    title = 'test CMS 01'
    bottomContent = '<script type="text/javascript" src="./cms.bundle.js"></script>'
  } else {
    appMarkup = renderToString(sheet.collectStyles(<App />))
    styleTags = sheet.getStyleTags()
    headContent = `<meta name="author" content="Ruslan Zaytsev">\n${styleTags}`
    title = 'test clinet 01'
    bottomContent = '<script type="text/javascript" src="./client.bundle.js"></script>'
  }

  const fra = {
    title,
    appMarkup,
    headContent,
    bottomContent,
  }
  res.locals.fra = fra

  next()
}
