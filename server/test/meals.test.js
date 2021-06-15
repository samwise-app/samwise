const { ApolloServer, gql } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-express');

const { typeDefs } = require('../src/controllers/graph-schema');
const { resolvers } = require('../src/controllers/graph-resolvers');
const { DataSource } = require('../src/controllers/graph-datasource');

const GET_UNITS = gql`
  query getUnits {
    getUnits {
      id
      name
    }
  }
`;

it('fetches all units', async () => {
  const server = new ApolloServer({
    typeDefs,
    dataSources: () => ({
      BookAPI: new DataSource.BookAPI(),
      AuthorAPI: new DataSource.AuthorAPI(),
      RecipeAPI: new DataSource.RecipeAPI(),
      IngredientAPI: new DataSource.IngredientAPI(),
      UnitAPI: new DataSource.UnitAPI(),
    }),
    resolvers,
    mocks: true,
  });
  await server.start();

  // mock the dataSource's underlying fetch methods
  launchAPI.get = jest.fn(() => [mockLaunchResponse]);
  userAPI.store = mockStore;
  userAPI.store.trips.findAll.mockReturnValueOnce([{ dataValues: { launchId: 1 } }]);

  // run query against the server and snapshot the output
  const res = await server.executeOperation({ query: GET_LAUNCH, variables: { id: 1 } });
  expect(res).toMatchSnapshot();
});
