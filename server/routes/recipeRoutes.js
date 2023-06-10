const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.homepage);
// '/recipe/random'
router.get('/random', recipeController.getRandomRecipe);
// '/recipe/search'
router.get('/search', recipeController.searchRecipes);

module.exports = router;
