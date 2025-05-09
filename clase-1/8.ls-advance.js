const fs = require('node:fs/promises');
const path = require('node:path');
const folder = process.argv[2] ?? '.' // Get folder from command line argument or default to current directory
const pc = require('picocolors')

async function ls(folder) { 
    let files = []; // Initialize empty array for files
    
    try{
            files = await fs.readdir(folder); // Read directory
            files.forEach(file => { // Iterate over files
            })
        }catch { // Handle error
        console.error(pc.red('Error al leer el directorio: ${folder}')); // Log error message
        process.exit(1); // Exit process with error code
    }

    
    const filePromises = files.map(async file => { // Map over files to get stats
        const filePath = path.join(folder, file); // Get full file path
        let stats
        try {
            stats = await fs.stat(filePath); // Get file stats
            
        }catch{
            a.error('Error al leer el archivo: ${filePath}'); // Log error message
            process.exit(1); // Exit process with error code
        }

        const isDirectory = stats.isDirectory(); // Check if file is a directory
        const fileType = isDirectory ? 'directory' : 'file'; // Determine file type
        const fileSize = stats.size; // Get file size
        const fileModified = stats.mtime.toLocaleDateString(); // Get file modified time

        return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.toString().padStart(10))} ${pc.yellow(fileModified)}`; // Return formatted string
    });
    const filesInfo = await Promise.all(filePromises); // Wait for all file promises to resolve

    filesInfo.forEach(fileInfo => console.log(fileInfo)); // Log file info
}
ls(folder) // Call ls function with folder argument

