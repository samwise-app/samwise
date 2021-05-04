const express = require('express');
const books = require('./books/rest');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API Functioning - 👋',
  });
});

router.use('/books', books);

module.exports = router;
