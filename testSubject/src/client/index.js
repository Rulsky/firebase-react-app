import React from 'react'
import { hydrate } from 'react-dom'

import App from '../components'

const root = document.getElementById('root')

if (root) {
  hydrate(<App />, root)
}
