const UserModel = require("../models/user");
const jwtUtils = require("../utils/jwt.utils");
const bcrypt = require("bcrypt");
const { userInfo } = require("./usersController");
const usersController = require("./usersController");
// console.log(usersController.userInfo);
module.exports = {
  signUp: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const user = await UserModel.create({ username, email, password });
      res.status(201).json({ user: user._id });
    } catch (err) {
      res.status(200).send({ err });
    }
  },

  signIn: async (req, res) => {
    //Paramètres
    let email = req.body.email;
    let password = req.body.password;
    // console.log(email);

    if (email == null || password == null) {
      return res.status(400).json({ error: "Paramètres manquant" });
    }

    //On vérifie si l'email du login existe si oui on vérifie le MDP si non on retourne une erreur

    //     const foundUser = await UserModel.findOne ({ "email" : req.body.email });
    //  console.log(foundUser);

    UserModel.findOne({
      email: email,
    })
      .then((userFound) => {
        //   console.log(userFound);
        if (userFound) {
          bcrypt.compare(
            password,
            userFound.password,
            (errBycrypt, resBycrypt) => {
              if (resBycrypt) {
                return res.status(200).json({
                  userId: userFound._id,
                  token: jwtUtils.generateTokenForUser(userFound),
                });
              } else {
                return res.status(403).json({ error: "mot de passe invalid" });
              }
            }
          );
        } else {
          return res
            .status(404)
            .json({ error: "l'utlisateur n'existe pas dans la BDD" });
        }
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ error: "Impossible de vérifier l'utilisateur" });
      });
  },

};
