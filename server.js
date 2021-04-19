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

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//jwt
router.get("*", checkUser);

server.get("/jwtid", requireAuth);

server.use("/api/", apiRouter);

server.listen(process.env.PORT, () => {
  console.log(`serveur en ecoute sur le port ${process.env.PORT}`);
});
