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
  
  if(!isEmpty(req.headers.authorization)){
    console.log(req.headers.authorization);

    const token = await req.headers.authorization.slice(7);
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDMwZDZmMmY2ZDhkZTQxNzA0NWYzNWUiLCJpYXQiOjE2MTQ5MTk4NDQsImV4cCI6MTYxNDk5MTg0NH0.Ocfkz4MXvujK4bekrRz5QZXEfA3xdW6w2ocsPhJsGpQ";
  
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
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
  if(!isEmpty(req.headers.authorization)){

    const token = await req.headers.authorization.slice(7);
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(500).json("no token pass");
        } else {
          console.log(decodedToken.userId + " token passer dans requireAuth");
          next();
        }
      });
    } else {
      console.log("No token");
    }
  }
};
