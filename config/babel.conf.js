module.exports = {
  babelrc: false,
  presets: [
    ['@babel/env', {
      targets: {
        node: '6',
      },
    }],
    ['@babel/react', {
      development: process.env.BABEL_ENV === 'development',
    }],
  ],
  sourceMaps: 'both',
}
