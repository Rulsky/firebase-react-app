# WIP tool to make DX of react apps easier for firebase cloud functions users.

At the moment only transpiles es6 code for cloud functions - no dev server.

## Configuring
Out of the box it requires zero configuration, but you can tweak few things for your needs.

### How:
Add `fra` object to your `package.json` or create file `.frarc.json` in root of your project.

Please note, that, at the moment the config from `package.json` will take precedence over `.frarc.json` and they won't be merged, so use one of them. If you feel that you need such functionality, please, open an issue with this feature request.

### Config options:

- [babel](#babel)
- [proxy](#proxy)
- [renderMiddleware](#renderMiddleware)

#### babel:
__type__: object

__format__: 100% same format as .babelrc

__Description__: a custom babel configuration

__example__:
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
__type__: object

__Description__: If you need to proxy calls to API. [Read more here](https://webpack.js.org/configuration/dev-server/#devserver-proxy)

__Example and default value__:
````json
"proxy": {
  "/api": "http://localhost:5000"
}
````

#### renderMiddleware
__type__: string

__default value__: "./src/server/renderMiddleware.js"

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


## CLI options
 -c, --clean - completly remove your `functions` dir and generate everything anew icluding `package-lock.json` and `node_modules` inside of it.
 --yarn - use yarn instead of npm to install deps
 

## Known problems
- due to the nature of chokidar changing case of letters (between lower and upper) of filenames won't be reflected in filename changing of transpiled files until dev restart. Does not affect the build process. Cured by either renaming file with changing a number of symbols or simply restarting.