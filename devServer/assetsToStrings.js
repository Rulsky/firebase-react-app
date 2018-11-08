const normalizeAssets = (assets) => {
  if (typeof assets === 'object' && !Array.isArray(assets)) {
    return Object.keys(assets).map(k => assets[k])
  }
  return Array.isArray(assets) ? assets : [assets]
}

module.exports = chunks => Object.keys(chunks).map(chunk => normalizeAssets(chunks[chunk])
  .filter(path => path.endsWith('.js'))
  .map(path => `<script src="${path}"></script>`)
  .join('\n'))
  .join('\n')
