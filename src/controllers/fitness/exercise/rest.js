const express = require('express');
const BookAPI = require('./datasource');

const api = new BookAPI();

const router = express.Router();

router.get('/', async (req, res) => {
  const queryResponse = await api.getAllBooks();
  return res.json({ queryResponse });
});

router.post('/find', async (req, res) => {
  let query = await api.findBook(req.body);
  return res.json({ query });
});

module.exports = router;
