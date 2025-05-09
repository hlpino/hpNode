const fs = require('node:fs/promises')

fs.readdir('./')
    .then(files => { // Read directory
      files.forEach(file => { // Iterate over files
        console.log(file) // Log file name
      })
    })
    .catch(err => { // Handle error
      console.error('Error al leer el directorio:', err) // Log error message
      return // Exit function on error
    })
