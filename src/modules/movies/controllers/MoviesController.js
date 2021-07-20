const AxiosInstance = new(require('./../../../utils/Axios'));

class MoviesController {

    async filterMoviesByExpression(req, res) {

        let { params: { expression } } = req;
    
        try {
            if(expression == null) throw new Error('We had a expression to process the requests');

            let { data, status, statusText } = await AxiosInstance.makeRequest('get', `https://imdb-api.com/en/API/SearchTitle/${'k_1tww1rfd'}/${expression}`);

            if (data && status == 200 && statusText == 'OK') {
                res.status(status).send({ data: data, message: `Successfully requests to get ${expression} related titles`  })
            } else {
                throw new Error('IMDB had a problem processing your requests, try again');
            }

        } catch (e) {
            res.status(500).send({ message: e.toString() });
        }
    }

    async filterMoviesById(req, res){

        let { params: { id } } = req;
    
        try {
            if(id == null) throw new Error('We had a expression to process the requests');

            let { data, status, statusText } = await AxiosInstance.makeRequest('get', `https://imdb-api.com/en/API/Title/${'k_1tww1rfd'}/${id}`);

            if (data && status == 200 && statusText == 'OK') {
                res.status(status).send({ data: data, message: `Successfully requests to get ${id} title`  })
            } else {
                throw new Error('IMDB had a problem processing your requests, try again');
            }

        } catch (e) {
            res.status(500).send({ message: e.toString() });
        }
        
    }



}

module.exports = MoviesController;