const http = require('node:http')
const desiredPort = process.env.PORT ?? 3000 // Desired port number

const fs = require('node:fs') // Import the fs module


const processRequest = (req, res) => { // Create HTTP server

    if(req.url === '/'){

        res.statusCode = 200 //OK
        res.setHeader('Content-Type', 'text/html; charset = utf-8')
        res.end('<h1>Hello, Mi perritllá</h1>'); // Send response body 
    } else if (req.url === '/imagen-topro.png'){
        console.error("ENTRO AL Path")
        fs.readFile('./photo.jpg', (err, data)=>{
            if(err){
                console.log("ENTRO AL ERROR", err)
                res.statusCode = 500 // Internal Server Error
                res.setHeader('Content-Type', 'text/html; charset = utf-8')
                res.end('<h1>Internal Server Error</h1>')
            }else{
                console.log("ENTRO AL OK", err)
                res.statusCode = 200 //OK
                res.setHeader('Content-Type', 'image/jpg')
                res.end(data) // Send response body   
            }
        })

    }else if(req.url === '/contact'){

        res.statusCode = 200 //OK
        res.setHeader('Content-Type', 'text/html; charset = utf-8')
        res.end('<h1>Contact</h1>')
    }else{
        res.statusCode = 404 // Not Found
        res.setHeader('Content-Type', 'text/html; charset = utf-8')
        res.end('<h1>404 Not Found</h1>')
    }
    
}

const server = http.createServer(processRequest) // Create server with request handler


server.listen(desiredPort, ()=> {
        console.log(`Server running at http://localhost:${desiredPort}`) // Log server running message
})
 