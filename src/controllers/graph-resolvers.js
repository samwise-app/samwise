const { GraphQLScalarType } = require('graphql');

const { resolvers: books } = require('./knowledge/books/resolvers');
const { resolvers: authors } = require('./knowledge/authors/resolvers');
const { resolvers: recipes } = require('./meals/recipes/resolvers');
const { resolvers: ingredients } = require('./meals/ingredients/resolvers');
const { resolvers: units } = require('./meals/units/resolvers');

const resolvers = {
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: 'Handles JSON types from SQL',
    serialize: (obj) => obj,
  }),
};
exports.resolvers = [books, authors, recipes, ingredients, units, resolvers];
