import { platform, release, arch, cpus, networkInterfaces, totalmem, freemem, homedir, tmpdir } from 'node:os'

console.log(platform()) // 'darwin', 'linux', 'win32', etc.
console.log(release()) // '20.6.0', '5.10.0-21-amd64', etc.
console.log(arch()) // 'x64', 'arm64', etc.
console.log(cpus()) // Array of CPU info objects
console.log(networkInterfaces()) // Network interfaces info
console.log(totalmem() / 1024 / 1024) // Total memory in gb
console.log(freemem() / 1024 / 1024) // Free memory in bytes
console.log(homedir()) // Home directory
console.log(tmpdir()) // Temporary directory
