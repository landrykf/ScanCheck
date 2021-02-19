const UserModel = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = {
  follow: async (req, res) => {
    //   console.log(req.body);
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)){
        
        return res.status(400).send(`ID inconnu : ` + req.params.id);
    }

    try {
      //Ajouter à la liste des follower
      await UserModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { following: req.body.idToFollow } },
        { new: true, upsert: true },

        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).json(err);
        }
      );

      //Ajouter à la liste des following
      await UserModel.findByIdAndUpdate(req.body.idToFollow, {
        $addToSet: { followers: req.params.id }},

        {new: true, upsert: true},
        (err, docs) => {
            // if(!err) res.status(201).json(docs);
            if (err) return res.status(400).json(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  unfollow: async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow)){
        return res.status(400).send(`ID inconnu : ` + req.params.id);
    }

    try {
        //supprimer de la liste des followers

        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upsert: true },
    
            (err, docs) => {
              if (!err) res.status(201).json(docs);
              else return res.status(400).json(err);
            }
          );
    
          //Ajouter à la liste des following
          await UserModel.findByIdAndUpdate(req.body.idToUnFollow, {
            $pull: { followers: req.params.id }},
    
            {new: true, upsert: true},
            (err, docs) => {
                // if(!err) res.status(201).json(docs);
                if (err) return res.status(400).json(err);
            }
          );

    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};
