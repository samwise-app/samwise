const { gql } = require('apollo-server-express');
const { typeDefs: books } = require('./knowledge/books/schema');
const { typeDefs: authors } = require('./knowledge/authors/schema');
const { typeDefs: recipes } = require('./meals/recipes/schema');
const { typeDefs: ingredients } = require('./meals/ingredients/schema');
const { typeDefs: units } = require('./meals/units/schema');

const typeDefs = gql`
  scalar JSON
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type DatabaseResponse {
    message: String!
  }
  ${books}
  ${authors}
  ${recipes}
  ${ingredients}
  ${units}
`;

exports.typeDefs = typeDefs;
