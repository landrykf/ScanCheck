const LikeModel = require("../models/Like");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = {
    getLikes: (req, res) => {
        let variable = {commentId: req.body.commentId}

        LikeModel.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, likes})
        })
    },

    upLike: (req, res) => {
        let variable = {commentId: req.body.commentId, userId: req.body.userId}

        const like = new LikeModel(variable)

        //save the like information data in monngo db 
        like.save((err, likeResult) => {
            if(err) return res.json({success: false, err});
            res.status(200).json({success: true, likeResult})
        })
    },

    unLike: (req, res) => {
        let variable = {commentId: req.body.commentId, userId: req.body.userId }

        //save thr like information data in monngo db 
        console.log(variable)
        LikeModel.findOneAndDelete(variable)
            .exec((err, unlikeResult) => {

                if(err) return res.json({success: false, err});
                res.status(200).json({success: true, unlikeResult})
            })
      
    }
}

