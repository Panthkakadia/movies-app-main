const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { isLoggedIn, isOwner } = require('../middleware/auth');
const { movieValidator } = require('../middleware/validators');
const Movie = require('../models/Movie');

router.get('/', movieController.index);
router.get('/new', isLoggedIn, movieController.newForm);
router.post('/', isLoggedIn, movieValidator, movieController.create);
router.get('/:id', movieController.show);
router.get('/:id/edit', isLoggedIn, isOwner, movieController.editForm);
router.put('/:id', isLoggedIn, isOwner, movieValidator, movieController.update);
router.delete('/:id', isLoggedIn, isOwner, movieController.delete);

// Movie Recipe
router.get('/:id/recipe', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    
    const recipes = {
        action: { snack: 'Nachos & Energy Drinks', mood: 'High Energy!' },
        comedy: { snack: 'Popcorn & Candy', mood: 'Fun Night!' },
        drama: { snack: 'Wine & Cheese', mood: 'Sophisticated Evening' },
        horror: { snack: 'Pizza & Soda', mood: 'Comfort Food Ready!' },
        default: { snack: 'Classic Popcorn & Soda', mood: 'Movie Night!' }
    };
    
    const genre = movie.genres[0]?.toLowerCase() || 'default';
    const recipe = recipes[genre] || recipes.default;
    
    res.json({ movie: movie.name, ...recipe });
});
module.exports = router;
