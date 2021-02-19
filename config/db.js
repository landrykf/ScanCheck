const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER_PASS}@cluster0.2a1of.mongodb.net/mangatheque`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
)
  .then(()=> console.log('Connecter à MongoDb'))
  .catch((err) => console.log("Erreur de connexion à MongoDB", err));
