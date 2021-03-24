const CommentModel = require("../models/comment");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = {
    saveComment: (req, res) => {
        const comment = new CommentModel(req.body)

        comment.save((err, comment) => {
            if(err) return res.json({succes: false, err})

            //On récupère le commentaire par son id
            CommentModel.find({ '_id': comment._id })
            //On remplit le champ "writer" avec les informations de "User" 
            .populate('writer')
            //on execute la requête
            .exec((err, result) => {
                if(err) return res.json({ succes:false, err })
                return res.status(200).json({success:true, result})
                
            })
        })
    },

    getComments: (req, res) => {
        console.log(req.body);

        CommentModel.find({"mangaId": req.body.mangaId})
        .populate('writer')
        .exec((err, comments) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, comments})
        })
    }
}

