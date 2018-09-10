# WIP tool to make DX of react apps easier for firebase cloud functions users.

At the moment only transpiles es6 code for cloud functions - no dev server.

## Configuring
Out of the box it requires zero configuration, but you can tweak few things for your needs.

### How:
Add field `fra` to your `package.json` or create file `.frarc.json` in root of your project.

Please note, that, at the moment the config from `package.json` will take precedence over `.frarc.json` and they won't be merged, so use one of them. If you feel that you need such functionality, please, open an issue with this feature request.

### Config options:

- [babel](#babel)
- [proxy](#proxy)

#### babel:
type: object
format: 100% same format as .babelrc
example:
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
type: object
If you need to proxy calls to API. [Read more here](https://webpack.js.org/configuration/dev-server/#devserver-proxy)

Example and default value:
````json
"proxy": {
  "/api": "http://localhost:5000"
}
````


## CLI options
 -c, --clean - completly remove your `functions` dir and generate everything anew icluding `package-lock.json` and `node_modules` inside of it.
 --yarn - use yarn instead of npm to install deps


## Known problems
- due to the nature of chokidar changing case of letters (between lower and upper) of filenames won't be reflected in filename changing of transpiled files until dev restart. Does not affect the build process. Cured by either renaming file with changing a number of symbols or simply restarting.