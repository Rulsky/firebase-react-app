const { HOSTING_DIR, CLIENT_ENTRY } = require('./constants')
const babelConfig = require('./babel.conf.webpackProd.js')

module.exports = {
  mode: 'production',
  entry: [
    CLIENT_ENTRY,
  ],
  output: {
    filename: 'bundle.js',
    path: HOSTING_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', options: babelConfig,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
}
