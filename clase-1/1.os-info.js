const os = require('node:os')

console.log(os.platform()) // 'darwin', 'linux', 'win32', etc.
console.log(os.release()) // '20.6.0', '5.10.0-21-amd64', etc.
console.log(os.arch()) // 'x64', 'arm64', etc.
console.log(os.cpus()) // Array of CPU info objects
console.log(os.networkInterfaces()) // Network interfaces info
console.log(os.totalmem() / 1024 / 1024) // Total memory in gb
console.log(os.freemem() / 1024 / 1024) // Free memory in bytes
console.log(os.homedir()) // Home directory
console.log(os.tmpdir()) // Temporary directory
