const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");


module.exports.checkUser = async (req, res, next) => {
  
  console.log(req.headers)
    // const token = await req.headers.authorization.slice(7);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDMwZDZmMmY2ZDhkZTQxNzA0NWYzNWUiLCJpYXQiOjE2MTQ3NDY3NTEsImV4cCI6MTYxNDgxODc1MX0.B3QnNEdvj9-w7aiF0ruVO8GBlV2kxuCS4bZYY3tYIFs';
    
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
  
  
};

module.exports.requireAuth = async (req, res, next) => {
    
    const token = await req.headers.authorization.slice(7);
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(500).json('no token pass')
      } else {
        console.log(decodedToken.userId + ' token passer dans requireAuth');
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
