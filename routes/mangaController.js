const MangaModel = require ('../models/manga');
const UserModel = require('../models/user');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports = {
getManga : (req, res) => {
    MangaModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Erreur to get data: ' + err);
        //du plus récent au plus ancien
    }).sort({ createdAt: -1 })
},

createManga : async (req, res) => {
    const newManga = new MangaModel({
        posterId: req.body.posterId,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        likers : [],
        comments: [],
    }); 

    try {
        const manga = await newManga.save();
        return res.status(201).json(manga);
    }catch (err){
        return res.status(400).send(err)
    }
},

updateManga : (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu: " + req.params.id)

    const updatedRecord = {
        title : req.body.title,
        category:req.body.category,
        description: req.body.description,
    }

    MangaModel.findByIdAndUpdate(
        req.params.id,
        {$set: updatedRecord},
        {new: true},
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
},

deleteManga : (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + err)

    MangaModel.findByIdAndRemove (
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs)
            else console.log("Delete error : " + err);
        }
    )
    
}
}  