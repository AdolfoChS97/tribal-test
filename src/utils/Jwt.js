const jwt = require('jsonwebtoken');


class Jwt {

    signToken(payload, secret){
        return jwt.sign(payload, secret);
    }

    verifyToken(token, secret){
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, function(err, decoded) {
                if(err) reject(err);
                resolve(decoded);
            });
        });
    }

}

module.exports = Jwt;