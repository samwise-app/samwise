const { GraphQLScalarType } = require('graphql');

const { resolvers: books } = require('./books/resolvers');
const { resolvers: authors } = require('./authors/resolvers');

const resolvers = {
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: 'Handles JSON types from SQL',
    serialize: (obj) => obj,
  }),
};
exports.resolvers = [books, authors, resolvers];
