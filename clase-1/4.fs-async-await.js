// const { promisify } = require('node:util'); // Promise module
// const readFile = promisify(fs.readFile); // Promisify file read

// para modulos q no tienen promesas nativas

const { readFile } = require('node:fs/promises'); // File system module

(
    async () => { // IIFE to use await at the top level
      try {
        console.log('Leyendo 1er archivo...') // Log file read
        const text = await readFile('./holamundo.txt', 'utf-8')
        console.log(text) // Log file content
      } catch (err) {
        console.error('Error al leer el archivo:', err) // Handle error
      } // Asynchronous file read

      console.log('Haciendo una pausa...') // Log pause

      try {
        console.log('Leyendo 2do archivo...') // Log file read
        const text2 = await readFile('./archivo2.txt', 'utf-8')
        console.log(text2) // Log file content
      } catch (err) {
        console.error('Error al leer el archivo:', err) // Handle error
      } // Asynchronous file read
    })()

// Alternative using a named async function es la misma pinga q iife de arriba
async function leerArchivo () {
  try {
    console.log('Leyendo 1er archivo...') // Log file read
    const text = await readFile('./holamundo.txt', 'utf-8')
    console.log(text) // Log file content
  } catch (err) {
    console.error('Error al leer el archivo:', err) // Handle error
  } // Asynchronous file read

  console.log('Haciendo una pausa...') // Log pause

  try {
    console.log('Leyendo 2do archivo...') // Log file read
    const text2 = await readFile('./archivo2.txt', 'utf-8')
    console.log(text2) // Log file content
  } catch (err) {
    console.error('Error al leer el archivo:', err) // Handle error
  } // Asynchronous file read
}
leerArchivo() // Call the function to read files

