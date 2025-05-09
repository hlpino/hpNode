// const { promisify } = require('node:util'); // Promise module
// const readFile = promisify(fs.readFile); // Promisify file read

// para modulos q no tienen promesas nativas

const fs = require('node:fs/promises') // File system module

console.log('Leyendo 1er archivo...') // Log file read
fs.readFile('./holamundo.txt', 'utf-8')
    .then(text => {
      console.log(text) // Log file content
    })
    .catch(err => {
      console.error('Error al leer el archivo:', err) // Handle error
    }) // Asynchronous file read

console.log('Leyendo 2do archivo...') // Log file read
fs.readFile('./archivo2.txt', 'utf-8')
    .then(text2 => {
      console.log(text2) // Log file content
    })
    .catch(err => {
      console.error('Error al leer el archivo:', err) // Handle error
    }) // Asynchronous file read
// Compare this snippet from 3.fs-readFile.js:
// fs.readFile('./archivo2.txt', 'utf-8')
