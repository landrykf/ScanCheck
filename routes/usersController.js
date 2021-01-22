const bcrypt = require('bcrypt');
const jwtUtils =require('../utils/jwt.utils')
const models = require ('../models');
const asyncLib = require('async');

//
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const PASSWORD_REGEX = /^[a-zA-Z]\w{3,14}$/

//Routes
module.exports = {
    register:(req, res)=>{
        
        //Params
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let bio = req.body.bio;

        //check if the params are not empty

        if(email == null || username == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        //TODO verify pseudo length, mail regex..

        if (username.length >= 13 || username.length <= 3){
            return res.status(400).json({'error':'pseudo invalide (votre pseudo doit contenir entre 5 et 12 carachtères)'})
        }

        if (!EMAIL_REGEX.test(email)){
            return res.status(400).json({'error': 'email invalid'})   
        }

        if (!PASSWORD_REGEX.test(password)){
            return res.status(400).json({'error': 'mot de passe unvalide(le premier caractère du mot de passe doit être une lettre, il doit comporter entre 4 et 15 caractère sans caractère spéciaux sauf "_") '})
        }

        //On vérifie si l'utilisateur existe déja dans la bdd
        models.User.findOne({
            attributes: ['email'],
            where: {email : email}
        })
        .then((userFound)=>{
            if(!userFound){
                bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                    let newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio : bio,
                        isAdmin: 0
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({'error':'impossible d\'ajouter l\'utilisateur'})
                    })
                });
            }else{
                return res.status(409).json({'error': 'l\'utilisateur existe déja'})
            }

        })
        .catch((err)=>{
            return res.status(500).json({'error': 'impossible de vérifier l\'utilisateur'})
        });
    },

    login:(req, res) =>{
        //Paramètres
        let email = req.body.email;
        let password = req.body.password;

        if(email == null || password == null) {
            return res.status(400).json({'error':'Paramètres manquant'})
        }

        //TOdo verify mail regex & password length


        //On vérifie l'email du login existe si oui on vérifie le MDP si non on retourne un erreur
        models.User.findOne({
            where: {email : email}
        })
        .then((userFound) => {
            if (userFound) {
                bcrypt.compare(password,userFound.password, (errBycrypt,resBycrypt) => {
                    if(resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else{
                        return res.status(403).json({"error":"mot de passe invalid"})
                    }
                })
            }else {
                return res.status(404).json({'error':'l\'utlisateur n\'existe pas dans la BDD'})
            }
        })
        .catch((err) => {
            return res.status(500).json({'error':'Impossible de vérifier l\'utilisateur'})
        })

    }
}