const express = require('express');
const app = express();
const MoviesController = new (require('./../controllers/MoviesController'));
const GeneralMiddleware = new (require('./../../../middlewares/GeneralMdw'));

app.use(async (req, res, next) => {
    await GeneralMiddleware.checkToken(req, res, next);
});

app.get('/movies/:expression', async(req, res) => {
    await MoviesController.filterMoviesByExpression(req, res);
});

app.get('/movies/information/:id', async(req, res) => {
    await MoviesController.filterMoviesById(req, res);
});

app.post('/movies/information/:id', async(req, res) => {
    await MoviesController.addCommentByMovie(req, res);
});


module.exports = app;