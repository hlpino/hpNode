import express, { json } from 'express' // require -> commonJS
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)
// const movies = require('./movies.json')

export const createServer = ({movieModel}) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

  // Todos los recursos que sean MOVIES se identifica con /movies
  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
