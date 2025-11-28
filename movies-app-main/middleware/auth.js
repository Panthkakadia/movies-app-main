exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) return next();
  req.session.error = 'You must be logged in';
  res.redirect('/login');
};
exports.isOwner = async (req, res, next) => {
  const Movie = require('../models/Movie');
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    req.session.error = 'Movie not found';
    return res.redirect('/movies');
  }
  if (movie.user.equals(req.session.userId)) return next();
  req.session.error = 'Not authorized';
  res.redirect(`/movies/${req.params.id}`);
};
