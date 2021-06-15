const express = require('express');
const IngredientAPI = require('./datasource');

const api = new IngredientAPI();

const router = express.Router();

router.get('/', async (req, res) => {
  const queryResponse = await api.getAllIngredients();
  return res.json({ queryResponse });
});

router.post('/find', async (req, res) => {
  let query = await api.findIngredient(req.body);
  return res.json({ query });
});

module.exports = router;
