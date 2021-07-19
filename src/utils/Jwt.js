const jwt = require('jsonwebtoken');


class Jwt {

    signToken(payload, secret){
        return jwt.sign(payload, secret);
    }

}

module.exports = Jwt;