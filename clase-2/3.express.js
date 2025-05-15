const express = require("express");
const ditto = require('./pokemon/ditto.json')


const app = express(); // Create an Express application
app.disabled("x-powered-by"); // Disable the 'X-Powered-By' header for security reasons
const PORT = process.env.PORT ?? 3000; // Define the port number

app.use(express.json()); // Middleware to parse JSON request bodies

// Middleware example manually

// app.use('/',(req, res, next) => {

//     console.log("Middleware executed"); // Log middleware execution
//    if(req.method !== 'POST') return next()
//     if(req.headers['content-type'] !== 'application/json') return next()
//      // check all request POST and content-type json

//     let body = "";
//     req.on("data", (chunk) => {
//         body += chunk.toString(); // Convert Buffer to string
//     });
//     req.on("end", () => {
//         const data = JSON.parse(body); // Parse JSON from request body
//         //mutar la request y meterla en el req.body
//         req.body = data; // Add parsed data to request object

//         next(); // Call the next middleware or route handler
//     });
// })

// Routing

app.get("/pokemon/ditto", (req, res) => {
    res.status(200).send(ditto); 
})


app.post("/pokemon", (req, res) => {
    res.status(201).json(req.body); 
})



//handle 404 Not Found
app.use((req, res) => {
    res.status(404).send("<h1>404 Not Found</h1>"); // Handle 404 Not Found
});







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});