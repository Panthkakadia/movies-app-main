const Movie = require('../models/Movie');
const { validationResult } = require('express-validator');
exports.index = async (req, res) => {
  const query = req.session.userId ? { user: req.session.userId } : {};
  const movies = await Movie.find(query).sort('-createdAt');
  res.render('movies/list', { movies });
};
exports.newForm = (req, res) => {
  res.render('movies/form', { movie: {}, formAction: '/movies' });
};
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('movies/form', { movie: req.body, errors: errors.array(), formAction: '/movies' });
  }
  const movieData = {
    name: req.body.name,
    description: req.body.description,
    year: req.body.year,
    genres: req.body.genres.split(',').map(g => g.trim()),
    rating: req.body.rating,
    poster: req.body.poster,
    user: req.session.userId
  };
  await Movie.create(movieData);
  req.session.success = 'Movie added!';
  res.redirect('/movies');
};
exports.show = async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate('user');
    if (!movie) return res.redirect('/movies');
    const isOwner = req.session.userId && movie.user._id.toString() === req.session.userId;
    res.render('movies/show', { movie, isOwner });
};
exports.editForm = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render('movies/form', { movie, formAction: `/movies/${movie._id}?_method=PUT` });
};
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('movies/form', { movie: req.body, errors: errors.array(), formAction: `/movies/${req.params.id}?_method=PUT` });
  }
  const updateData = {
    name: req.body.name,
    description: req.body.description,
    year: req.body.year,
    genres: req.body.genres.split(',').map(g => g.trim()),
    rating: req.body.rating,
    poster: req.body.poster
  };
  await Movie.findByIdAndUpdate(req.params.id, updateData);
  req.session.success = 'Movie updated!';
  res.redirect(`/movies/${req.params.id}`);
};
exports.delete = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  req.session.success = 'Movie deleted!';
  res.redirect('/movies');
};
