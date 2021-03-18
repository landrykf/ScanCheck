const mongoose = require('mongoose');
const { isEmail } = require ('validator')
const bcrypt = require('bcrypt');

// parramètres de l'utilisateur

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trimp: true
        },
        email: {
            type:String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type : String,
            required: true, 
            max: 1024,
            minlength: 6
        },
        picture: {
            type: String,
            default:"../frontend/public/favicon.ico"
        },
        banner: {
            type: String,
            default: "../frontend/public/favicon.ico"
        },

        bio : {
            type: String,
            max: 1024,
        },
        followers: {
            type: [String]
        },
        following: {
            type: [String]
        },
        likes: {
            type: [String]
        }
    },

    {
        //enregistre l'heure exact de l'enregistrement de l'utilisteur
        timestamps:true
    }
);

//crypter le mot de passe avant d'enregistrer le schéma dans la bdd
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next(); 
})


const UserModel = mongoose.model('user', userSchema)

// const UserModel = mongoose.model('user', userSchema, 'user');

module.exports = UserModel;