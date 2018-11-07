const makeEntry = (entry, additionalEntry = undefined) => {
  if (Array.isArray(entry)) {
    if (additionalEntry) {
      return [...entry, additionalEntry]
    }
    return entry
  }

  if (typeof entry === 'object') {
    const keys = Object.keys(entry)
    return keys.reduce((acc, el) => {
      if (additionalEntry) {
        acc[el] = [entry[el], additionalEntry]
      } else {
        acc[el] = entry[el]
      }
      return acc
    }, {})
  }

  if (additionalEntry) {
    return [entry, additionalEntry]
  }
  return entry
}

module.exports = makeEntry
