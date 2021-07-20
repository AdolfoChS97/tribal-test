const express = require('express');
const app = express();
const MoviesController = new (require('./../controllers/MoviesController'));

app.get('/movies/:expression', async(req, res) => {

    await MoviesController.filterMoviesByExpression(req, res);

});

app.get('/movies/information/:id', async(req, res) => {

    await MoviesController.filterMoviesById(req, res);

});


module.exports = app;