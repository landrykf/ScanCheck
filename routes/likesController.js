//Imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
let asyncLib = require('async');
//Constantes

//Routes  

module.exports = {
    likePost: function(req, res) {
        //récupérer l'entête d'authentification
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);
        
        //Params
        let messageId = parseInt(req.params.messageId);

        if(messageId <= 0) {
            return res.status(400).json({'error':'paramètre invalide'})
        }

        models.Message.findOne({
            where: { id: messageId }
        })
        .then((messageFound)=>{
            if (messageFound) {
                models.User.findOne({
                    where:{id: userId}
                })
                .then((userFound)=>{
                    if(userFound){
                        models.Like.findOne({
                            where: {
                                userId: userId,
                                messageId: messageId
                            }
                        })
                        .then((isUserAlreadyLiked)=> {
                            if (!isUserAlreadyLiked) {
                                messageFound.addUser(userFound)
                                .then((alreadyLikeFound) =>{
                                    messageFound.update({
                                        likes: messageFound.likes + 1,
                                    }).then((messageFound)=>{
                                        if (messageFound) {
                                            return res.status(201).json(messageFound);
                                        }else {
                                            return res.status(500).json({'error':'impossible de modifier le message'})
                                        }
                                    }).catch(function(err){
                                        res.status(500).json({'error':'ne peut pas mettre à jour un message comme un compteur'})
                                    })
                                })
                                .catch(function(err){
                                    return res.status(500).json({'error':'impossible de déclencher la réaction de l\'utilisateur'})
                                })
                            }else{
                                res.status(409).json({'error': 'message déja liké'})
                            }
                        })
                        .catch((err)=>{
                            return res.status(500).json({'error': 'impossible de vérifier si l\'utilisateur à déja liké '})
                        })
                    }else{
                        return res.status(404).json({'error':'l\'utilisateur n\'existe pas'})
                    }
                })
                .catch((err)=>{
                    return res.status(500).json({'error':'utilisateur non vérifié'})
                })
            }else{
                res.status(404).json({'error':'poste déjà aimé'})
            }
        })
        .catch((err)=>{
            return res.status(500).json({'error': 'impossible de verifier le message'})
        })

    },
    dislikePost: function(req, res) {
        //récupérer l'entête d'authentification
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);
        
        //Params
        let messageId = parseInt(req.params.messageId);

        if(messageId <= 0) {
            return res.status(400).json({'error':'paramètre invalide'})
        }

        models.Message.findOne({
            where: { id: messageId }
        })
        .then((messageFound)=>{
            if (messageFound) {
                models.User.findOne({
                    where:{id: userId}
                })
                .then((userFound)=>{
                    if(userFound){
                        models.Like.findOne({
                            where: {
                                userId: userId,
                                messageId: messageId
                            }
                        })
                        .then((isUserAlreadyLiked)=> {
                            if (!isUserAlreadyLiked) {
                                isUserAlreadyLiked.destroy()
                                messageFound.addUser(userFound)
                                .then((alreadyLikeFound) =>{
                                    messageFound.update({
                                        likes: messageFound.likes - 1,
                                    }).then((messageFound)=>{
                                        if (messageFound) {
                                            return res.status(201).json(messageFound);
                                        }else {
                                            return res.status(500).json({'error':'impossible de modifier le message'})
                                        }
                                    }).catch(function(err){
                                        res.status(500).json({'error':'ne peut pas mettre à jour un message comme un compteur'})
                                    })
                                })
                                .catch(function(err){
                                    return res.status(500).json({'error':'impossible de déclencher la réaction de l\'utilisateur'})
                                })
                            }else{
                                res.status(409).json({'error': 'message déja liké'})
                            }
                        })
                        .catch((err)=>{
                            return res.status(500).json({'error': 'impossible de vérifier si l\'utilisateur à déja liké '})
                        })
                    }else{
                        return res.status(404).json({'error':'l\'utilisateur n\'existe pas'})
                    }
                })
                .catch((err)=>{
                    return res.status(500).json({'error':'utilisateur non vérifié'})
                })
            }else{
                res.status(404).json({'error':'poste déjà aimé'})
            }
        })
        .catch((err)=>{
            return res.status(500).json({'error': 'impossible de verifier le message'})
        })
    }

}