module.exports = {
  babelrc: false,
  presets: [
    '@babel/flow',
    ['@babel/react', {
      development: process.env.BABEL_ENV === 'development',
    }],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-display-name',
  ],
  sourceMap: 'both',
}
