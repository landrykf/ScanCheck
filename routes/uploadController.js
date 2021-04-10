const MangaModel = require("../models/manga");
const UserModel = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");
module.exports = {
  uploadProfil: async (req, res) => {
    try {
      if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      )
        throw Error("invalid file");
      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(401).json({ errors });
    }
    const fileName = req.body.name + ".jpg";

    await pipeline(
      req.file.stream,

      fs.createWriteStream(
        `${__dirname}/../frontend/public/uploads/profil/${fileName}`
      )
    );

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set : {picture : "../uploads/profil/" + fileName}},
            {new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err })
            }
        )
    } catch (err) {
        return res.status(500).send({ message: err })
    }
  },

  uploadBanner: async (req, res) => {
    try {
      if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      )
        throw Error("invalid file");
      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(401).json({ errors });
    }
    const fileName = req.body.name + "banner" + ".jpg";

    await pipeline(
      req.file.stream,

      fs.createWriteStream(
        `${__dirname}/../frontend/public/uploads/banner/${fileName}`
      )
    );

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set : {banner : "./uploads/banner/" + fileName}},
            {new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message:'update' + err })
            }
        )
    } catch (err) {
        return res.status(500).send({ message:'try' + err })
    }
  },
};
