const CommentModel = require('./../models/CommentModel');

class Movies {
    
    async getMovieByTitle(title){
        return await CommentModel.find({ 'title': title }).exec();
    }

    async updateCommentByIdMovie(id, comment, idUser){
        let { n, nModified, ok } = await CommentModel.updateOne({'_id': id}, { $push: { comment: { text: comment, by: idUser } } }).exec();
        if (n && nModified && ok) {
            return true;
        } else {
            throw new Error('Movie couldnt update');            
        }
    }

    async saveCommentFilm(title, comment, idUser){
        return new Promise((resolve, reject) => {
            const commentary = new CommentModel({ title: title, comment: { text: comment, by: idUser } });
            commentary.save((err, commentary ) => {
                if(err) reject(err);
                resolve(commentary);
            });
        });
    }
}

module.exports = Movies;