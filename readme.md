# (WIP) tool to make DX of react apps easier for firebase cloud functions users.

At the moment this tool can:
- To transpile es-next code into compatible one with firebase cloud functions.
- Does server-side rendering (SSR) with hot module replacement (HMR) in development.
- Does basic webpacking for hosting on firebase hosting.
- Provides jest transformer to write tests with es-next syntax



## Configuring
Out of the box it requires zero configuration (jest is an exeption), but you can tweak few things for your needs.



### How:
Add `fra` object to your `package.json` or create file `.frarc.json` in root of your project.

Please note, that, at the moment the config from `package.json` will take precedence over `.frarc.json` and they won't be merged, so use one of them. If you feel that you need such functionality, please, open an issue with this feature request.



### Config options:

- [babel](#babel)
- [proxy](#proxy)
- [renderMiddleware](#renderMiddleware)
- [static](#static)

#### babel:
__Type__: object

__Format__: 100% same format as .babelrc

__Description__: a custom babel configuration

__Example__:
````json
"babel": {
  "presets": [
    ["@babel/preset-stage-0", {
      "useBuiltIns": true,
    }]
  ]
}
````

#### proxy:
__Type__: object

__Description__: If you need to proxy calls to API. [Read more here](https://webpack.js.org/configuration/dev-server/#devserver-proxy)

__Example and default value__:
````json
"proxy": {
  "/api": "http://localhost:5000"
}
````

#### renderMiddleware

__Type__: string

__Default value__: "./src/server/renderMiddleware.js"

__Description__: If you want to provide a custom SSR bahaviour to your DX, you need to implement an express middleware that will enhance `responce.locals` with `fra` object that should contain 4 properties with type of string:
  - title: a page title.
  - headContent: everything you want to see in `<head>` tag.
  - appMarkup: a static result of `renderToString` of your React and complimentary libs.
  - bottomContent: everything you want to go into very bottom of the page - right before `</body>` closing tag.
  
All of them will be inserted into page template and served to your localhost.

Minimal example of the middleware:
````javascript
import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../components'

export default (req, res, next) => {
  const fra = {
    headContent: '<meta name="author" value="John Doe"/>',
    appMarkup: renderToString(<App />),
    bottomContent: '<script type"text/javascript">window.MY_GLOBAL_VAR="anything"</script>',
    title: 'a title for my page',
  }
  res.locals.fra = fra

  next()
}
````


#### static

__type__: string

__default value__: "static"

__Description__: a directoty where static files (like fonts, images, etc.) are stored. From this directory files will be served during development and will be copied to your hosting directory. Files are served from root of your host.

__Example__:
````javascript
/**
 * Imagane that you have an image in your project with path `static/images/hero.jpg`
 *
 * Now you can consume this file in your code like this
 */

<img src="./images/hero.jpg" alt="description"/>
````




## CLI options

 -c, --clean - completly remove your `functions` dir and generate everything anew icluding `package-lock.json` and `node_modules` inside of it.
 --yarn - use yarn instead of npm to install deps



## Running tests with jest

If you want to run tests with jest you need to specify a config option for transforming your sources into campatible format.

In your jest config (i.e. `jest` property of your root `package.json` or separete file for jest config) do this:

````json
// in your package.json
"jest": {
  "transform": {
    "\\.js$": "@rulsky/firebase-react-app/jestTransformer.js"
  }
}
````

more about jest configuration is here: [jest docs](https://jestjs.io/docs/en/configuration.html)



## Known problems

- due to the nature of chokidar changing case of letters (between lower and upper) of filenames won't be reflected in filename changing of transpiled files until dev restart. Does not affect the build process. Cured by either renaming file with changing a number of symbols or simply restarting.