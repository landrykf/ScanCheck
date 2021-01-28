// Imports 
const express = require('express');
const bodyParser = require('body-parser')
const apiRouter = require('./apiRouter').router;
//Instantiate server
const server = express();

//cors error fix

server.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Body Parser configuration 
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//configure routes

server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> bonjour mon server <h1>')
})

server.use('/api/', apiRouter);

//Launch server
server.listen(8000, () =>{
    console.log('serveur en écoute sur le port 8000')
})