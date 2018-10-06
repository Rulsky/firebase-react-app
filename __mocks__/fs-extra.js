const fileRegister = Object.create(null)

const addToRegister = (name, content) => { fileRegister[name] = content }

const outputFile = (filename, content) => Promise.resolve({ filename, content })

const readJson = filename => Promise.resolve(fileRegister[filename])

const remove = filename => Promise.resolve(filename)

// eslint-disable-next-line no-console
const displayRegister = () => console.log(fileRegister)

module.exports = {
  __addToRegister: addToRegister,
  __displayRegister: displayRegister,
  outputFile,
  readJson,
  remove,
}
