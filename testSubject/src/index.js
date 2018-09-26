import { https } from 'firebase-functions'
import express from 'express'

import render from './server/render'

const app = express()

render(app)

const server = https.onRequest(app)

export { server } // eslint-disable-line import/prefer-default-export
