const fs = require('node:fs'); // File system module


console.log('Leyendo 1er archivo...'); // Log file read
fs.readFile('./holamundo.txt', 'utf-8', (err,text)=>{
    console.log(text); // Log file content
    if (err) throw err; // Handle error
}); // Asynchronous file read




console.log('Leyendo 2do archivo...'); // Log file read
fs.readFile('./archivo2.txt', 'utf-8', (err,text2)=>{
    if (err) throw err; // Handle error
    console.log(text2); // Log file content
}); // Asynchronous file read
