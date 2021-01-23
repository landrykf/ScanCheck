//Imports 
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils')

//Constants 
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

//Routes

module.exports = {
    //On crée le message 
    createdMessage : (req, res)=>{
        //On récupère l'id grace au système de token
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        //paramètre
        let title = req.body.title;
        let content = req.body.content;

        //On vérfie si le titre et le contenu du message sont valide
        if (title == null || content == null){
            return res.status(400).json({'error': 'paramètres manquants'})
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({'error': 'paramètre invalide'})
        }

        models.User.findOne({
            where: { id : userId }
        })
        .then((userFound)=>{
            if (userFound) {
                models.Message.create({
                    title : title,
                    content: content,
                    likes : 0,
                    UserId: userFound.id
                })
                .then((newMessage)=> {
                    return res.status(201).json({ newMessage })
                })
                .catch((err)=> {
                    return res.status(500).json({'error':'impossible de poster le message'})
                })
            }else{
                res.status(404).json({'error':'utilisateur non trouvé'})
            }
        })
        .catch((err)=>{
            return res.status(500).json({'error':'Impossible de vérifier l\'utilisateur' })
        })

    },
    listMessages : (req, res)=>{
        //paramètres pour récupérer les messages par blocs
        let fields = req.query.fields; //permet de selectionner les colonnes
        let limit = parseInt(req.query.limit); //permet de recupérer les message par segment
        let offset = parseInt(req.query.offset);//
        let order = req.query.order; //permet de mettre la liste dans un ordre

        models.Message.findAll({
            order: [(order != null) ? order.split(':'): ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null)? fields.split(',') : null,
            limit:(!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            //On inclu le model user pour faire la liaison user/message
            include : [{
                model : models.User,
                attributes : ['username']
            }]
        }).then((messages)=>{
            if(messages) {
                res.status(200).json(messages);
            }
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({"error":"champs non valables"})
        })
    }
}