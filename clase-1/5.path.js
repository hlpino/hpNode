const path = require('node:path')

console.log(path.sep) // Log path separator

const filePath = path.join('carpeta1', 'carpeta2', 'archivo.txt') // Join paths

console.log(filePath) // Log joined path

const base = path.basename(filePath) // Get base name of file
console.log(base) // Log base name

const fileName = path.basename(filePath, '.txt') // Get file name without extension
console.log(fileName) // Log file name without extension

const extension = path.extname(filePath) // Get file extension
console.log(extension) // Log file extension
