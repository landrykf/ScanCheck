const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
// const isEmpty = require('../utils/isEmpty')
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

module.exports.checkUser = async (req, res, next) => {
  console.log(res.headers);

  if (!isEmpty(req.headers.authorization)) {
    // const token = await res.req.rawHeaders[7].slice(7);
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.locals.user = null;
          next();
        } else {
          let user = await UserModel.findById(decodedToken.userId);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  }
};

module.exports.requireAuth = async (req, res, next) => {
  if (!isEmpty(req.headers.authorization)) {
    // const token = res.req.rawHeaders[7].slice(7);
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(500).json("no token pass");
        } else {
          console.log(decodedToken.userId + " token passer dans requireAuth");
          res.status(200).json(decodedToken.userId);

          next();
        }
      });
    } else {
      console.log("No token");
    }
  }
};
