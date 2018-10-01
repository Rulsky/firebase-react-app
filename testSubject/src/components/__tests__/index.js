import React from 'react'
import App from '../index'

describe('App', () => {
  it('must fail due to throw', () => {
    expect(<App />).not.toBeNull()
  })
})
