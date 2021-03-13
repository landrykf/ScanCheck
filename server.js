const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const apiRouter = require("./apiRouter").router;
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const unless = require('express-unless');
const static = express.static(__dirname + '/public');
static.unless = unless;
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   credentials: true,
//   allowedHeaders: ["sessionId", "Content-Type"],
//   exposedHeaders: ["sessionId"],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
// };

// server.use(cors(corsOptions));


server.use(cors())

//cors error fix

// server.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS,HEAD');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// bodyParser config
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//jwt
server.get('*', checkUser);
// checkUser.unless = unless;
// server.use(checkUser.unless({
//   path: [
//     'jwtid api/users api/user/:id',
//     { url: '/', methods: ['GET'] }
//   ]
// }));

server.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
  // console.log(res.locals.user._id);
});

server.use("/api/", apiRouter);

//problème headers.auth




server.listen(process.env.PORT, () => {
  console.log(`serveur en ecoute sur le port ${process.env.PORT}`);
});
