const FavoriteModel = require("../models/favorite");
const ObjectID = require("mongoose").Types.ObjectId;
const UserModel = require("../models/user")

module.exports = {
  number: (req, res) => {
    FavoriteModel.find({ mangaId: req.body.mangaId }).exec((err, suscribe) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, suscribeNumber: suscribe.length });
    });
  },

  favorited: (req, res) => {
    FavoriteModel.find({
      userFrom: req.body.userFrom,
      mangaId: req.body.mangaId,
    }).exec((err, suscribe) => {
      if (err) return res.status(400).send(err);
      let result = false;
      console.log(req.body.userFrom);
      if (suscribe.length === 0) {
        result = true;
      }
      
      res.status(200).json({ success: true, suscribed: result });
    });
  },

  addToFavorite: async (req, res) => {
    // try {
      
    // } catch (error) {
      
    // }

    const favorite = new FavoriteModel(req.body);
    // console.log(req.body);
    favorite.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    });

    // await UserModel.findByIdAndUpdate(
    //   // console.log(req.body),
    //   req.body.userFrom,
    //   {
    //     $addToSet: { likes: req.body.mangaId },
    //   },
    //   { new: true },
    //   (err, docs) => {
    //     if (!err) res.send(docs);
    //     else return res.status(400).send("erreur2 " + err);
    //   }
    // );
  },

  removeFromFavorite: (req, res) => {
    FavoriteModel.findOneAndDelete({
      mangaId: req.body.mangaId,
      userFrom: req.body.userFrom,
    }).exec((err, doc) => {

      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, doc });
    });
  },

  getFavoredManga: (req, res) => {
    //Need to find all of the Users that I am subscribing to From Subscriber Collection
    FavoriteModel.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, favorites });
    });
  },
};
