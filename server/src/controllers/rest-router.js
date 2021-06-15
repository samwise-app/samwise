const express = require('express');
const books = require('./knowledge/books/rest');
const authors = require('./knowledge/authors/rest');
// const recipes = require('./meals/recipes/rest');
// const ingredients = require('./meals/ingredients/rest');

const router = express.Router();

router.get('/', (_, res) => {
  res.json({
    message: 'API Functioning - 👋',
  });
});

router.use('/books', books);
router.use('/authors', authors);
// router.use('/recipes', recipes);
// router.use('/ingredients', ingredients);

module.exports = router;
