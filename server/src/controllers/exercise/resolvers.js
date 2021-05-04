/* eslint-disable implicit-arrow-linebreak */
const { parseResolveInfo } = require('graphql-parse-resolve-info');

const resolvers = {
  Query: {
    allBooks: async (_, __, { dataSources }, resolveInfo) => {
      const { fieldsByTypeName: request } = parseResolveInfo(resolveInfo);
      return request.Book?.authors
        ? dataSources.BookAPI.getAllBooksWithAuthors()
        : dataSources.BookAPI.getAllBooks();
    },
    book: async (_, args, { dataSources }, resolveInfo) => {
      const { fieldsByTypeName: request } = parseResolveInfo(resolveInfo);
      return request.Book?.authors
        ? dataSources.BookAPI.getBookWithAuthors(args)
        : dataSources.BookAPI.getBook(args);
    },
  },
  Mutation: {
    addBook: async (_, args, { dataSources }) => {
      dataSources.BookAPI.createNewBook(args);
      args.book_input.authors?.forEach(async (author) => {
        let dbAuthor = author.new
          ? await dataSources.AuthorAPI.createNewAuthor(author)
          : await dataSources.AuthorAPI.getAuthor(args);
        dataSources.BookAPI.appendAuthorJunctionTable(args.id, dbAuthor.id[0]);
      });
    },
    deleteBook: async (_, args, { dataSources }) => {
      dataSources.BookAPI.deleteBook(args.id);
      dataSources.BookAPI.removeBookFromJunctionTable(args.id);
    },
    updateBook: async (_, args, { dataSources }) => {
      let dbBook = await dataSources.BookAPI.updateBook(args);
      args.book_input.authors?.forEach(async (author) => {
        let dbAuthor = author.new
          ? await dataSources.AuthorAPI.createNewAuthor(author)
          : await dataSources.AuthorAPI.getAuthor(args);
        dataSources.BookAPI.appendAuthorJunctionTable(args.id, dbAuthor.id[0]);
      });
    },
  },
};

exports.resolvers = resolvers;
