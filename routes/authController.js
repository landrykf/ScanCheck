const UserModel = require("../models/user");
const jwtUtils = require("../utils/jwt.utils");
const bcrypt = require("bcrypt");
const { userInfo } = require("./usersController");
const usersController = require("./usersController");
module.exports = {
  signUp: async (req, res) => {
    const { username, email, password, bio } = req.body;

    //check if the params are not empty

    if (email == null || username == null || password == null) {
      return res.status(400).json({ error: "Paramètres manquant" });
    }

    //TODO verify pseudo length, mail regex..

    if (username.length >= 13 || username.length <= 3) {
      return res.status(400).json({
        error:
          "pseudo invalide (votre pseudo doit contenir entre 5 et 12 carachtères)",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "le mot de passe doit contenir au moins 6 carractères",
      });
    }

    //On vérifie si l'utilisateur existe déja dans la bdd
    UserModel.findOne({
      //   attributes: ["email"],
      email: email,
    })
      .then((userFound) => {
        if (!userFound) {
          let newUser = UserModel.create({
            email: email,
            username: username,
            password: password,
            bio: bio,
            isAdmin: 0,
          })
            .then((newUser) => {
              return res.status(201).json({
                userId: newUser._id,
              });
            })
            .catch((err) => {
              return res
                .status(500)
                .json({ error: "impossible d'ajouter l'utilisateur" });
            });
        } else {
          return res.status(409).json({ error: "l'utilisateur existe déja" });
        }
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ error: "impossible de vérifier l'utilisateur" });
      });

    // try {
    //   const user = await UserModel.create({ username, email, password });
    //   res.status(201).json({ user: user._id });
    // } catch (err) {
    //   res.status(200).send({ err });
    // }
  },

  signIn: async (req, res) => {
    //Paramètres
    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
      return res.status(400).json({ error: "Paramètres manquant" });
    }

    //On vérifie si l'email du login existe si oui on vérifie le MDP si non on retourne une erreur

    //     const foundUser = await UserModel.findOne ({ "email" : req.body.email });

    UserModel.findOne({
      email: email, 
    })
      .then((userFound) => {
 
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
                return res.status(403).json({ error: "mot de passe invalide" });
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
