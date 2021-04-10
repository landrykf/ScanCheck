const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReadSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    mangaId: {
      type: String,
    },
  },
  { timestamps: true }
);

const ReadModel = mongoose.model('Read', ReadSchema);
module.exports = ReadModel;