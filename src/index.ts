import express from 'express'
import runSeeds from '~/seeds/region.seeds'
import configApp from '~/config/app'
import { env } from '~/config/env'
const app = express()

runSeeds()

configApp(app)

app.listen(env.BACKEND_PORT, () => {
  console.log(`Server is running on ${env.BACKEND_HOST}:${env.BACKEND_PORT}`)
})
