const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const apiRouter = require("./apiRouter").router;
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const unless = require("express-unless");
const static = express.static(__dirname + "/public");
static.unless = unless;
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");





const router = express.Router();
server.use(cors());
// server.use(function(req, res, next) {
//   console.log('request', req.url, req.body, req.method);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
//   if(req.method === 'OPTIONS') {
//       res.end();
//   }
//   else {
//       next();
//   }
// });

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
router.get("*", checkUser);
// checkUser.unless = unless;
// server.use(checkUser.unless({
//   path: [
//     'jwtid api/users api/user/:id',
//     { url: '/', methods: ['GET'] }
//   ]
// }));

// server.get("/jwtid", requireAuth, (req, res) => {
//   console.log(res.locals);
//   res.status(200).json(res.locals.user._id);
// });

server.get("/jwtid", requireAuth)

server.use("/api/", apiRouter);

//problème headers.auth

server.listen(process.env.PORT, () => {
  console.log(`serveur en ecoute sur le port ${process.env.PORT}`);
});
