const UserModel = require('./../models/UserModel');
const UserClass = new (require('./../classes/User'));
const JwtInstance = new (require('./../../../utils/Jwt'));
const CryptoInstance = require('./../../../utils/Crypto');

// TO DO SET A PATH WHERE THE FUNCTION EXPECT A SECRET KEY
class UserController {

    async loginUser(req, res) {
        let { body } = req;
        try {
            if(body['email'] && body['password']) {

                if(!await UserClass.checkUserAccount(body['email'], body['password'])) throw new Error('That account not exists')

                let token = JwtInstance.signToken(body, 'bd');

                res.status(200).send({ data: { email: body['email'], token: token }, message: 'Successfully login' });

            } else {
                throw new Error('Parameters are missing to process the request');
            }

        } catch (e) {
            res.status(500).send({ message: e.toString() });
        }   

    }

    async registerUser(req, res,){
        let { body: { name, lastname, email, password } } = req;
        try {
            
            if(name && email && password ) {

                if(await UserClass.emailAlreadyExists(email)) throw new Error('That email already exists');

                let encryptedPassword = CryptoInstance.encrypt(password, 'bd');

                const user = new UserModel({ name: name, lastname: lastname, email: email, password: encryptedPassword  });
                
                user.save((err, user ) => {
                    if(err) res.status(500).send({ message: err });
                    res.status(200).send({ message: 'Successfully insert user' });
                });

            } else {
                throw new Error('Parameters are missing to process the request');
            }
            
        } catch (e) {
            res.status(500).send({ message: e.toString() });
        }   
    }
    
}


module.exports = UserController;