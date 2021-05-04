const { gql } = require('apollo-server-express');
const { typeDefs: books } = require('./books/schema');
const { typeDefs: authors } = require('./authors/schema');

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
`;

exports.typeDefs = typeDefs;
