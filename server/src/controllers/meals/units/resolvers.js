/* eslint-disable implicit-arrow-linebreak */
const { parseResolveInfo } = require('graphql-parse-resolve-info');

const resolvers = {
  Query: {
    allUnits: async (_, __, { dataSources }) => {
      return dataSources.UnitAPI.getAllUnits();
    },
    unit: async (_, args, { dataSources }) => {
      return dataSources.UnitAPI.getUnit(args.unit_input);
    },
  },
  Mutation: {
    addUnit: async (_, args, { dataSources }) => {
      return ({ message } = await dataSources.UnitAPI.createUnit(args.unit_input));
    },
    deleteUnit: async (_, args, { dataSources }) => {
      return ({ message } = await dataSources.UnitAPI.deleteUnit(args.id));
    },
    updateUnit: async (_, args, { dataSources }) => {
      return ({ message } = await dataSources.UnitAPI.updateUnit(args.id, args.unit_input));
    },
  },
};

exports.resolvers = resolvers;
