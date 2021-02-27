const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'tokensecret';

//Exporter fonctions

module.exports = {
    generateTokenForUser: (userData) => {
        
        return jwt.sign({
            userId: userData._id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '20h'
        })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ',''): null;
    },
    getUserId: function(authorization){
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
        
        console.log(token);
        if(token != null){
            try{
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null){
                    userId = jwtToken.userId;
                }

            }catch(err){
                console.log(err)
            }
        }
        return userId;
    }
}