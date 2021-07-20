let cryptomdl;
try {
    cryptomdl = require('crypto');
} catch (e) {
    throw new Error(e);
}

class Crypto {

    constructor(algorithm){
        this.algorithm = algorithm;   
    }
    
    encrypt(password, key){
        let mykey = cryptomdl.createCipher(this.algorithm, key);
        let mystr = mykey.update(password, 'utf8', 'hex')
        mystr += mykey.final('hex');
        return mystr;
    }

    decrypt(password, key){
        var mykey = cryptomdl.createDecipher(this.algorithm, key);
        var mystr = mykey.update(password, 'hex', 'utf8')
        mystr += mykey.final('utf8');
        return mystr
    }

}

module.exports = new Crypto('aes-192-cbc');


