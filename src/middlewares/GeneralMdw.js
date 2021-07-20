const JwtInstance = new (require('./../utils/Jwt'));

class GeneralMiddleware {

    async checkToken(req, res, next){
        let { headers: { authorization } } = req;
        try {
            if(authorization) {
                let token = authorization.split('Bearer ').pop();
                let user = await JwtInstance.verifyToken(token, 'bd');
                delete user['password'];
                Object.assign(req, { user: user });
                next();
            } else {
                throw new Error('You must include a Authorization header')
            }    
        } catch (e) {
            res.status(500).send({ message: e.toString() });
        }
    }

}

module.exports = GeneralMiddleware;