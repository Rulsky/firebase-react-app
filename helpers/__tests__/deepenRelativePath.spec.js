const deepenRelativePath = require('../deepenRelativePath')

describe('deepenRelativePath', () => {
  it('return same object if no package with local path were inside', () => {
    const actual = {
      foo: '~3.0.2',
      baz: 'git+ssh://git@github.com:baz/baz.git#v1.0.27',
      bar: '^5.2.4',
    }
    expect(deepenRelativePath(actual)).toEqual(actual)
  })

  it('return object with deepened rel path', () => {
    const actual = {
      local2: 'file:../module2',
      local3: 'file:./module3',
      local1: 'file:../../local1module',
    }
    const expected = {
      local2: 'file:../../module2',
      local3: 'file:../module3',
      local1: 'file:../../../local1module',
    }
    expect(deepenRelativePath(actual)).toEqual(expected)
  })

  it('mixed case', () => {
    const actual = {
      foo: '~3.0.2',
      baz: 'git+ssh://git@github.com:baz/baz.git#v1.0.27',
      bar: '^5.2.4',
      local1: 'file:../../local1module',
      local2: 'file:../module2',
      local3: 'file:./module3',
    }
    const expected = {
      foo: '~3.0.2',
      baz: 'git+ssh://git@github.com:baz/baz.git#v1.0.27',
      bar: '^5.2.4',
      local1: 'file:../../../local1module',
      local2: 'file:../../module2',
      local3: 'file:../module3',
    }
    expect(deepenRelativePath(actual)).toEqual(expected)
  })

  it('rel path with no "file:"', () => {
    const actual = {
      localChild: './module3',
      localParent: '..',
      localGrandParent: '../../local1module',
    }
    const expected = {
      localChild: '../module3',
      localParent: '../..',
      localGrandParent: '../../../local1module',
    }
    expect(deepenRelativePath(actual)).toEqual(expected)
  })
})
