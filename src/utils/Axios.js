const axios = require('axios');

class Axios {

    async makeRequest(method, url){
        try {
            return await axios({ method: method, url: url });
        } catch (e) {
            throw new Error(e);
        }
    }

}

module.exports = Axios;