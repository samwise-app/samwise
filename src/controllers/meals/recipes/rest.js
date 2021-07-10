const express = require('express');
const RecipeAPI = require('./datasource');

const api = new RecipeAPI();

const router = express.Router();

router.get('/', async (req, res) => {
  const queryResponse = await api.getAllRecipes();
  return res.json({ queryResponse });
});

router.post('/find', async (req, res) => {
  let query = await api.findRecipe(req.body);
  return res.json({ query });
});

module.exports = router;
