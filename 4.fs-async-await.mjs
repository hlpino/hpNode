//const { promisify } = require('node:util'); // Promise module
//const readFile = promisify(fs.readFile); // Promisify file read

//para modulos q no tienen promesas nativas

import { readFile } from 'node:fs/promises'; // File system module 

console.log('Leyendo 1er archivo...'); // Log file read
const text = await readFile('./holamundo.txt', 'utf-8') 
console.log(text) // Log file content
// Handle error
    //}); // Asynchronous file read

console.log('Haciendo una pausa...') // Log pause




console.log('Leyendo 2do archivo...') // Log file read
const text2 = await readFile('./archivo2.txt', 'utf-8')
console.log(text2); // Log file content
// Handle error
    //}); // Asynchronous file read
