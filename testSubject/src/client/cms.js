import React from 'react'
import { hydrate } from 'react-dom'

import CMS from '../components/cms'

const root = document.getElementById('root')

if (root) {
  hydrate(<CMS />, root)
}
