const UserModel = require('./../models/UserModel');
const CryptoInstance = require('./../../../utils/Crypto');

class User {

    async emailAlreadyExists(email){
        const foundUser = await UserModel.find({ email: email });
        if(foundUser.length > 0) return true;
        else return false;
    }

    async checkUserAccount(email, password){
        let encryptedPassword = CryptoInstance.encrypt(password, 'bd');
        const [ user ] = await UserModel.find({ email: email, password: encryptedPassword });
        if(!user) return { result: false, user: undefined };
        else return { result: true, user: user};
    }

}

module.exports = User;