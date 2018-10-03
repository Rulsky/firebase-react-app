describe('runNpmInstall', () => {
  /* eslint-disable global-require */
  beforeEach(() => {
    jest.mock('cross-spawn')
    jest.mock('../../config/constants')
  })

  it('called with npm', () => {
    const spawn = require('cross-spawn')
    const spy = jest.spyOn(spawn, 'sync')
    const runNpmInstall = require('../runNpmInstall')
    runNpmInstall()
    expect(spy).toHaveBeenCalledWith(
      'cd',
      ['functions', '&&', 'npm', 'i'],
      { shell: true, stdio: 'inherit' }
    )
  })

  it('called with yarn', () => {
    const spawn = require('cross-spawn')
    const spy = jest.spyOn(spawn, 'sync')
    const runNpmInstall = require('../runNpmInstall')
    runNpmInstall('yarn')
    expect(spy).toHaveBeenCalledWith(
      'cd',
      ['functions', '&&', 'yarn'],
      { shell: true, stdio: 'inherit' }
    )
  })
})
