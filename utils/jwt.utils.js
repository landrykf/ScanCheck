const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'tokensecret'
//Exporter fonctions

module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}