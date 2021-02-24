const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref : 'user'
    },
    mangaId: {
        type: String
    },
    mangaTitle: {
        type: String
    },
    mangaImage:{
        type: String
    }
}, {timestamps: true})

const Favorite = mongoose.model('favorite', favoriteSchema);

module.exports =  Favorite ;
