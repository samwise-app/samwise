const express = require('express');
const AuthorAPI = require('./datasource');

const api = new AuthorAPI();

const router = express.Router();

router.get('/', async (req, res) => {
  const queryResponse = await api.getAllAuthors();
  return res.json({ queryResponse });
});

router.post('/find', async (req, res) => {
  let query = await api.findAuthor(req.body);
  return res.json({ query });
});

module.exports = router;
