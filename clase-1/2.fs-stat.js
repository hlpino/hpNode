const fs = require('node:fs'); // File system module

const stats = fs.statSync('./holamundo.txt'); // Synchronous file stats

console.log(stats); // Log file stats
console.log(stats.isFile()); // Check if it's a file
console.log(stats.isDirectory()); // Check if it's a directory
console.log(stats.size); // Log file size in bytes
console.log(stats.isSymbolicLink);
