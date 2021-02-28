const MangaModel = require("../models/manga");
const UserModel = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = {
  likeManga: async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID inconnu: " + req.params.id);

    try {
      await MangaModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likers: req.body.id },
        },
        { new: true },
        (err, docs) => {
          if (err) return res.status.send("erreur1 " + err);
        }
      );
      await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $addToSet: { likes: req.params.id },
        },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else return res.status(400).send("erreur2 " + err);
        }
      );
    } catch (err) {
      return res.status(400).send("erreur3 " + err);
    }
  },

  unlikeManga: async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID inconnu: " + req.params.id);

    try {
      await MangaModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likers: req.body.id },
        },
        { new: true },
        (err, docs) => {
          if (err) return res.status.send("erreur1 " + err);
        }
      );
      await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $pull: { likes: req.params.id },
        },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else return res.status(400).send("erreur2 " + err);
        }
      );
    } catch (err) {
      return res.status(400).send("erreur3 " + err);
    }
  },
};
