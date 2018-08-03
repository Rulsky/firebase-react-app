const { sync } = require('cross-spawn')
const { FUNCTIONS_DIR_NAME } = require('../../config/constants')

const runNpmInstall = () => sync('cd', [FUNCTIONS_DIR_NAME, '&&', 'npm', 'i'], {
  stdio: 'inherit',
  shell: true,
})

module.exports = runNpmInstall
