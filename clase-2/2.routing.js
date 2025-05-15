const http = require('node:http')
const ditto = require('./pokemon/ditto.json') // Import the ditto.json file


const processRequest = (req, res) => { // Create HTTP server

    const {method, url} = req // Destructure method and url from request object
    
    switch (method) {
        case 'GET': // Handle GET requests
            switch (url) {
                case '/pokemon/ditto':
                    console.log('GET /pokemon/ditto',ditto) // Log request
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(ditto)) // Send JSON response
                    default:
                        res.statusCode = 404 // Not Found
                        res.setHeader('Content-Type', 'text/html; charset=utf-8')
                        return res.end('<h1>404 Not Found</h1>') // Send 404 response
            }
        case 'POST': // Handle POST requests
            switch (url) {
                case '/pokemon':{

                    let body = ''
                    req.on('data', chunk => {
                        body += chunk.toString() // Convert Buffer to string
                    })
                    req.on('end', () => {
                        const data = JSON.parse(body) // Parse JSON from request body
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'}) // Set response headers
                        res.end(JSON.stringify({message: 'Pokemon created',     })) // Send response
                    })
                    break
                }
                default:
                    res.statusCode = 404 // Not Found
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404 Not Found</h1>') // Send 404 response
            }         
            
    
    }
}

const server = http.createServer(processRequest) // Create server with request handler


server.listen(3000, ()=> {
        console.log(`Server running at http://localhost:${3000}`) // Log server running message
})
 