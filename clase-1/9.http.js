const http = require('node:http');
const { findFreePort } = require('./10.free-port.js'); // Import findFreePort function
const desiredPort = process.env.PORT ?? 3000; // Desired port number


const server = http.createServer((req, res) => { // Create HTTP server
    console.log('Request received'); // Log request received
    res.writeHead(200, {'Content-Type': 'text/plain'}); // Set response header
    res.end('Hello, World!\n'); // Send response body
});

findFreePort(desiredPort)
    .then(port => {
        server.listen(port, ()=> {
            console.log(`Server running at http://localhost:${port}`); // Log server running message
        })
    })
