// import { MongoClient, ServerApiVersion } from 'mongodb'

import fs from 'fs'
import { randomUUID } from 'node:crypto'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) // import movies from './movies.json' with { type: 'json' } // ESM

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({id}) {
    const movie = movies.find(movie => movie.id === id)
    if (movie) return movie
    return false
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input
    }
    movies.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    movies.splice(movieIndex, 1)

    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    const updatedMovie = {
      ...movies[movieIndex],
      ...input
    }

    movies[movieIndex] = updatedMovie

    return updatedMovie
  }
}

// const uri = 'mongodb+srv://hlpino:MyCard140277553525.@cluster0.m0owdtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true
//   }
// })

// async function run () {
//   try {
//     // Connect the client to the server(optional starting in v4.7)
//     await client.connect()
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 })
//     console.log('Pinged your deployment. You successfully connected to MongoDB!')
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }
// run().catch(console.dir)
