const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

require('dotenv').config({path:'./config/.env'});
require('./config/db');

// bodyParser config
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json());


server.use('/api/', apiRouter);


server.listen(process.env.PORT, () =>{
    console.log(`serveur en ecoute sur le port ${process.env.PORT}`);
})