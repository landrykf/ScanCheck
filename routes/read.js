const ReadModel = require("../models/read");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = {

  getReadedManga: (req, res) => {

    ReadModel.find({ userId: req.body.userId }).exec((err, readed) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, readed });
    })
  },
  getReads: (req, res) => {
    let variable = { mangaId: req.body.mangaId };

    ReadModel.find(variable).exec((err, reads) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, reads });
    });
  },

  readed: (req, res) => {
      let variables = {mangaId: req.body.mangaId, userId: req.body.userId}

      const read = new ReadModel(variables)
      read.save((err, readResult) =>{
          if(err) return res.status(400).send(err);
          res.status(200).json({success: true, readResult})
      })
  },

  removeFromReaded: (req, res) => {
    let variables = {mangaId: req.body.mangaId, userId: req.body.userId}

    console.log(variables);

    ReadModel.findOneAndDelete(variables)
        .exec((err, removeResult) => {
            if (err) return res.json({success: false , err});
            res.status(200).json({success: true, removeResult})
        }) 

  }
};
