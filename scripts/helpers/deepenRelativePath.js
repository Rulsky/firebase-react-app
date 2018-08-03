const deepenRelativePath = deps => Object.keys(deps).reduce((acc, key) => {
  const val = deps[key]
  if (val.indexOf('file:./') === 0) {
    return Object.assign({}, acc, { [key]: `file:../${val.slice(7)}` })
  } if (val.indexOf('file:../') === 0) {
    return Object.assign({}, acc, { [key]: `file:../${val.slice(5)}` })
  }
  return Object.assign({}, acc, { [key]: val })
}, {})


module.exports = deepenRelativePath
