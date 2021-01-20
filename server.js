// Imports 

let express = require('express');

//Instantiate server

let server = express();


//configure routes

server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> bonjour mon server <h1>')
})

//Launch server
server.listen(8000, () =>{
    console.log('serveur en écoute')
})