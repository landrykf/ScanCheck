const MangaModel = require("../models/manga");
const UserModel = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = {
  mangaComment: (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID inconnu: " + req.params.id);

    //On récupère l'id du manga et on fait un update dans la table des commentaires
    try {
      return MangaModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              commenterId: req.body.commenterId,
              commenterUsername: req.body.commenterUsername,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      res.status(400).send(err);
    }
  },

  editMangaComment: (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID inconnu: " + req.params.id);

    try {
      return MangaModel.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
          comment._id.equals(req.body.commentId)
        );

        if (!theComment) return res.status(404).send("commentaire non trouvé");
        theComment.text = req.body.text;

        return docs.save((err) => {
          if (!err) return res.status(200).send(docs);
          return res.status(500).send('comment'+err);
        });
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  deleteMangaComment: (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID inconnu: " + req.params.id);

    try {
      return MangaModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err); 
    }
  },
};
