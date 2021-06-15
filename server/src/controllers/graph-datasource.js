const BookAPI = require('./knowledge/books/datasource');
const AuthorAPI = require('./knowledge/authors/datasource');
const RecipeAPI = require('./meals/recipes/datasource');
const IngredientAPI = require('./meals/ingredients/datasource');
const UnitAPI = require('./meals/units/datasource');

exports.DataSource = { BookAPI, AuthorAPI, RecipeAPI, IngredientAPI, UnitAPI };
