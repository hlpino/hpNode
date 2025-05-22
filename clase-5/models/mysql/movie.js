import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}
let connection

async function getConnection () {
  if (!connection) {
    connection = await mysql.createConnection(config)
  }
  return connection
}

export class MovieModel {
  static async getAll ({ genre }) {
    const conn = await getConnection()
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [filteredMovies] = await conn.query(
        `SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) as id
         FROM movie m
         JOIN movie_genre mg ON m.id = mg.movie_id
         JOIN genre g ON mg.genre_id = g.id
         WHERE LOWER(g.name) = ?;`,
        [lowerCaseGenre]
      )
      return filteredMovies
    }
    const [result] = await conn.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id FROM movie;'
    )
    return result
  }

  static async getById ({ id }) {
    console.log('Buscando movie con id:', id)
    const conn = await getConnection()
    const [movie] = await conn.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    if (movie.length === 0) {
      console.log('No se encontró ninguna película con ese id')
      return null
    }
    return movie[0]
  }

  static async create ({ input }) {
    const conn = await getConnection()
    const {
      genre: genreInput, // genre is an array of genres
      title,
      year,
      director,
      duration,
      poster,
      rate } = input
    const [uuidResult] = await conn.query('SELECT UUID() uuid;')
    const [{uuid}] = uuidResult
    try {
      await conn.query(
          `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
           VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
          [uuid, title, year, director, duration, poster, rate]
        )
      // Manejar géneros si vienen en el input
      if (Array.isArray(genreInput) && genreInput.length > 0) {
        for (const genreName of genreInput) {
          // Buscar si el género ya existe (ignorando mayúsculas/minúsculas)
          const [genreRows] = await conn.query(
            'SELECT id FROM genre WHERE LOWER(name) = ?;', [genreName.toLowerCase()]
          )
          let genreId
          if (genreRows.length > 0) {
            // Si existe, usar ese id
            genreId = genreRows[0].id
          } else {
            // Si no existe, crear el género y obtener su id
            const [genreUuidResult] = await conn.query('SELECT UUID() uuid;')
            const [{uuid: genreUuid}] = genreUuidResult
            await conn.query(
              'INSERT INTO genre (id, name) VALUES (UUID_TO_BIN(?), ?);',
              [genreUuid, genreName]
            )
            // Obtener el id recién insertado
            genreId = genreUuid
          }
          // Insertar relación en movie_genre
          await conn.query(
            'INSERT INTO movie_genre (movie_id, genre_id) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?));',
            [uuid, genreId]
          )
        }
      }
    } catch (error) {
      console.error('Error al insertar la película:', error)
      throw new Error('Error al insertar la película')
    }
    const [movie] = await conn.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )
    console.log('Movie created:', movie)
    if (movie.length > 0) {
      return movie[0]
    } else {
      return null
    }
  }

  static async update ({ id, input }) {
    const conn = await getConnection()
    // Construir el SET dinámicamente solo con los campos enviados
    const fields = []
    const values = []
    for (const key in input) {
      fields.push(`${key} = ?`)
      values.push(input[key])
    }
    if (fields.length === 0) return null // Nada que actualizar
    const sql = `UPDATE movie SET ${fields.join(', ')} WHERE id = UUID_TO_BIN(?)`
    values.push(id)
    const [result] = await conn.query(sql, values)
    if (result.affectedRows === 0) return null
    // Devolver la película actualizada
    const [movie] = await conn.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    if (movie.length === 0) return null
    return movie[0]
  }

  static async delete ({ id }) {
    const conn = await getConnection()
    const [result] = await conn.query(
      'DELETE FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    if (result.affectedRows === 0) {
      return false
    }
    return true
  }
}
