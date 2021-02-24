const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;
const cors = require('cors')

require('dotenv').config({path:'./config/.env'});
require('./config/db');


    const corsOptions = {
        origin: process.env.CLIENT_URL,
        credentials: true,
        'allowedHeaders': ['sessionId', 'Content-Type'],
        'exposedHeaders': ['sessionId'],
        'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'preflightContinue': false
      }



server.use(cors(corsOptions));

// bodyParser config
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json());


server.use('/api/', apiRouter);


server.listen(process.env.PORT, () =>{
    console.log(`serveur en ecoute sur le port ${process.env.PORT}`);
})