const fs = require('node:fs') // File system module

console.log('Leyendo 1er archivo...') // Log file read
const text = fs.readFileSync('./holamundo.txt', 'utf-8') // Synchronous file read
console.log(text) // Log file content

console.log('Haciendo una pausa...') // Log pause

console.log('Leyendo 2do archivo...') // Log file read
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8') // Synchronous file read
console.log(text2) // Log file content

