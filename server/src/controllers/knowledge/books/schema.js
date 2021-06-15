const typeDefs = `

  ######### INPUTS #######

  input BookQueryInput{
    id:ID
    name: String
  }

  input BookMutationInput{
    title: String
    isbn_10: String
    isbn_13: String
    description: String
    has_been_read:Boolean
    notes: JSON
    image:String
    authors:[AuthorMutationInput]
  }

  ######### TYPES #######

  type BookComparison {
    title: Boolean
    isbn_10:Boolean
    isbn_13:Boolean
    authors:Boolean
  }
  
  type Book {
    id:ID
    title: String
    isbn_10: String
    isbn_13: String
    description: String
    notes: JSON
    image:String
    has_been_read:Boolean
    from_database: Boolean
    similar_match:BookComparison
    authors:[Author]
  }

  extend type Query {
    allBooks: [Book]
    book(includeGoogleSearch:Boolean,numberOfResultsRequested:Int, book_input:BookQueryInput!): [Book]
  }
  
  extend type Mutation {
    addBook(book_input:BookMutationInput!): DatabaseResponse
    updateBook(id:ID!, book_input:BookMutationInput!): DatabaseResponse
    deleteBook(id:ID!):DatabaseResponse
  }
`;

exports.typeDefs = typeDefs;
