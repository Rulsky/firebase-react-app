const normalizeAssets = (assets) => {
  if (typeof assets === 'object' && !Array.isArray(assets)) {
    return Object.keys(assets).map(k => assets[k])
  }
  return Array.isArray(assets) ? assets : [assets]
}

module.exports = ({ main }) => normalizeAssets(main)
  .filter(path => path.endsWith('.js'))
  .map(path => `<script src="${path}"></script>`)
  .join('\n')
