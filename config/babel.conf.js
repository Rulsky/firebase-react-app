module.exports = {
  babelrc: false,
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: '6',
        },
      },
    ],
    '@babel/react',
  ],
  sourceMaps: 'both',
}
