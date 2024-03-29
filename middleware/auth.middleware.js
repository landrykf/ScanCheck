const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

module.exports.checkUser = (req, res, next) => {
    const token = req.headers.authorization.slice(7);
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
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
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.headers.authorization.slice(7);
    // console.log(token); 
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token pass')
      } else {
        console.log(decodedToken.userId);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
