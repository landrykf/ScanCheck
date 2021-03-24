const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    mangaId: {
        type: String,
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String
    }
}, {timestamps: true})

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = CommentModel