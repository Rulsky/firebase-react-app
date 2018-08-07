const { sync } = require('cross-spawn')
const { FUNCTIONS_DIR_NAME } = require('../../config/constants')

const runNpmInstall = (yarn) => {
  const manager = yarn ? ['yarn'] : ['npm', 'i']
  return sync('cd', [FUNCTIONS_DIR_NAME, '&&', ...manager], {
    stdio: 'inherit',
    shell: true,
  })
}

module.exports = runNpmInstall
