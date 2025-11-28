const { body } = require('express-validator');
exports.movieValidator = [
  body('name').trim().notEmpty().isLength({ max: 100 }),
  body('description').trim().notEmpty().isLength({ max: 500 }),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }),
  body('genres').custom((value) => {
    if (!value || !value.trim()) throw new Error('Genres required');
    return true;
  }),
  body('rating').isFloat({ min: 0, max: 10 })
];
