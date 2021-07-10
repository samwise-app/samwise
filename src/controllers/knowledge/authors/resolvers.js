const { parseResolveInfo } = require('graphql-parse-resolve-info');

const resolvers = {
  Query: {
    allAuthors: async (_, __, { dataSources }, resolveInfo) => {
      const { fieldsByTypeName: request } = parseResolveInfo(resolveInfo);
      return request.Author?.books
        ? dataSources.AuthorAPI.getAllAuthorsWithBooks()
        : dataSources.AuthorAPI.getAllAuthors();
    },
    authors: async (_, args, { dataSources }, resolveInfo) => {
      const { fieldsByTypeName: request } = parseResolveInfo(resolveInfo);
      return request.Author?.books
        ? dataSources.AuthorAPI.getAuthorWithBooks(args)
        : dataSources.AuthorAPI.getAuthor(args);
    },
  },
  Mutation: {
    addAuthor: async (_, args, { dataSources }) => dataSources.AuthorAPI.createNewAuthor(args),
    deleteAuthor: async (_, args, { dataSources }) => dataSources.AuthorAPI.deleteAuthor(args.id),
    updateAuthor: async (_, args, { dataSources }) => dataSources.AuthorAPI.updateAuthor(args),
  },
};

exports.resolvers = resolvers;
