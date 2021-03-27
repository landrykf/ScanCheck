const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    mangaId: {
        type: String,
    }
},{timestamps: true})

const LikeModel = mongoose.model('Like', likeSchema);

module.exports = LikeModel