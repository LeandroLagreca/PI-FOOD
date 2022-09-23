const { Router } = require('express');
const router = Router();
const { DataRecipe, recipeByiD, recipeCreate } = require('./controllers');
const { DietList } = require('./diets');

router.get('/recipes', DataRecipe);
router.get('/recipes/:id', recipeByiD);
router.get('/diets', DietList);
router.post('/recipes', recipeCreate);

module.exports = router;
