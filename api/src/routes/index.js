const { Router } = require('express');
const router = Router();
const { DataRecipe, recipeByiD, recipeCreate, recipeEliminated } = require('./controllers');
const { DietList } = require('./diets');
router.get('/recipes/:id', recipeEliminated);
router.get('/recipes', DataRecipe);
router.get('/recipes/:id', recipeByiD);
router.get('/diets', DietList);
router.post('/recipes', recipeCreate);

module.exports = router;
