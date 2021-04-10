const UserModel = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await UserModel.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  userInfo: (req, res) => {
    // console.log('le parmamètre de l\'url est '+ req.params.id);
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send(`ID inconnu : ` + req.params.id);

    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID inconnu: " + err);
    });
  },

  updateUser: async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send(`ID inconnu : ` + req.params.id);

    try {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bio: req.body.bio,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          if (err) return res.status(500).send({ message: err });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  deleteUser: async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send(`ID inconnu : ` + req.params.id);

    try {
      await UserModel.remove({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Suppression éffectuée" });
    } catch (error) {
      return res.status(500).json({ message: err });
    }
  },
};
