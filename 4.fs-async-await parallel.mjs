// const { promisify } = require('node:util'); // Promise module
// const readFile = promisify(fs.readFile); // Promisify file read

// para modulos q no tienen promesas nativas

import { readFile } from 'node:fs/promises' // File system module

Promise.all([
  readFile('./holamundo.txt', 'utf-8'), // Read first file
  readFile('./archivo2.txt', 'utf-8') // Read second file
]).then(([text, text2]) => { // Destructure the results
  console.log('Leyendo 1er archivo...') // Log file read
  console.log(text) // Log file content

  console.log('Leyendo 2do archivo...') // Log file read
  console.log(text2) // Log file content
}).catch(err => { // Handle error
  console.error('Error al leer el archivo:', err) // Log error message
}) // Asynchronous file read

// Compare this snippet from 4.fs-async-await%20parallel.mjs:
// const fs = require('node:fs');
