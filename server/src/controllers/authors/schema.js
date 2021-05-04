const typeDefs = `

  ######### INPUTS #######

  """ This is for inputting data for a query """
  input AuthorQueryInput {
    id: ID
    first_name: String
    last_name: String
    full_name: String
  }

  """ This is for inputting data for a mutation """
  input AuthorMutationInput {
    id:ID
    new: Boolean
    first_name: String
    last_name: String
    full_name: String
  }

  ######### TYPES #######

  type Author {
    id: ID
    first_name: String
    last_name: String
    full_name: String
    books:[Book]
  }

  extend type Query {
    allAuthors: [Author]
    authors(includeGoogleSearch:Boolean,numberOfResultsRequested:Int, authors_input:[AuthorQueryInput]): [Author]
  }

  extend type Mutation {
    addAuthor(author_input:AuthorMutationInput!): DatabaseResponse
    updateAuthor(id:ID!, author_input:AuthorMutationInput!): DatabaseResponse
    deleteAuthor(id:ID!):DatabaseResponse
  }
`;

exports.typeDefs = typeDefs;
