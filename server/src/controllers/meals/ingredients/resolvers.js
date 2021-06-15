/* eslint-disable implicit-arrow-linebreak */
const { parseResolveInfo } = require('graphql-parse-resolve-info');

const resolvers = {
  Query: {
    allIngredients: async (_, __, { dataSources }) => {
      return dataSources.IngredientAPI.getAllIngredients();
    },
    ingredient: async (_, args, { dataSources }) => {
      return dataSources.IngredientAPI.getIngredient(args);
    },
  },
  Mutation: {
    addIngredient: async (_, args, { dataSources }) => {
      return ({ message } = await dataSources.IngredientAPI.createIngredient(args.ingredient_input));
    },
    deleteIngredient: async (_, args, { dataSources }) => {
      return ({ message } = await dataSources.IngredientAPI.deleteIngredient(args.id));
    },
    updateIngredient: async (_, args, { dataSources }) => {
      return ({ message } = await dataSources.IngredientAPI.updateIngredient(args.id, args.ingredient_input));
    },
  },
};

exports.resolvers = resolvers;
