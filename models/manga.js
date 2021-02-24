const mongoose = require("mongoose");

const MangaSchema = new mongoose.Schema({
  posterId: {
    type: String,
    required: true,
  },
  title: {
    title: String,
  },
  image: {
      type : String,
  },
  description : {
      type : String,
  },
  category : {
      type : String,
  },
  likers : {
      type: [String],
      required: true
  },
  comments: {
      type: [
          {
              commenterId: String,
              commenterUsername: String,
              text: String,
              timestamp: Number,
          }
      ],
      required: true,
  },
  
},
{
    timestamps: true,
}
);

const MangaModel = mongoose.model('manga', MangaSchema);

module.exports = MangaModel;