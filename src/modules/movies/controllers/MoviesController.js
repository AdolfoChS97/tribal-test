const AxiosInstance = new(require('./../../../utils/Axios'));
const MovieClass = new(require('./../classes/Movies'));
class MoviesController {

    async filterMoviesByExpression(req, res) {

        let { params: { expression } } = req;
    
        try {
            if(!expression) throw new Error('We had a expression to process the requests');

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
            if(!id) throw new Error('We need an id to process the request');

            let { data, status, statusText } = await AxiosInstance.makeRequest('get', `https://imdb-api.com/en/API/Title/${'k_1tww1rfd'}/${id}`);

            if (data && status == 200 && statusText == 'OK') {
                res.status(status).send({ data: data, message: `Successfully requests to get ${id} title`  });
            } else {
                throw new Error('IMDB had a problem processing your requests, try again');
            }

        } catch (e) {
            res.status(500).send({ message: e.toString() });
        }
        
    }

    async addCommentByMovie(req, res){
        let { params: { id }, body: { comment }, user: { _id } } = req;
        try {

            if(!id) throw new Error('We need an id to process the request');
            if(!comment) throw new Error('We need the comment to process the request');

            let { data: { title }, status, statusText } = await AxiosInstance.makeRequest('get', `https://imdb-api.com/en/API/Title/${'k_1tww1rfd'}/${id}`);

            if (title && status == 200 && statusText == 'OK') {

                let previousCommentByMovie = await MovieClass.getMovieByTitle(title);
                
                if (previousCommentByMovie.length > 0) {
                    
                    let [ movie ] = previousCommentByMovie;
                
                    if(await MovieClass.updateCommentByIdMovie(movie['_id'], comment, _id)) res.status(200).send({ message: `Successfully update comments in title: ${title} `});

                } else {
                    
                    if(await MovieClass.saveCommentFilm(title, comment, _id)) res.status(200).send({ message: `Successfully save comment in title: ${title}` });
                }

            } else {
                throw new Error('We couldnt get the title of the movie');
            }
            
        } catch (e) {
            res.status(500).send({ message: e.toString() });
        }
    }



}

module.exports = MoviesController;