const parseCommanderOptions = (command, ...lookups) => {
  if (Array.isArray(command) || typeof command !== 'object') throw new Error('first argument must be an object')
  return lookups.reduce((acc, cv) => {
    if (typeof cv !== 'string') throw new Error('lookups must be strings')
    if (command[cv] !== undefined || (command.parent && command.parent[cv] !== undefined)) {
      acc[cv] = true
    }
    return acc
  }, {})
}

module.exports = parseCommanderOptions
