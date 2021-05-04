const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const knex = require('./knex');

const { typeDefs } = require('./controllers/graph-schema');
const { resolvers } = require('./controllers/graph-resolvers');
const { DataSource } = require('./controllers/graph-datasource');

knex.on('query', (queryData) => {
  console.log('\x1b[95m%s\x1b[0m', queryData.sql);
  console.log('---- BREAK LINE -----');
});

const api = require('./controllers/rest-router');

const app = express();
const middlewares = require('./middlewares');

app.use(morgan('dev'));
// This is a fix for GraphIQL not loading
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  })
);
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    message: '👍👍',
  });
});

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    BookAPI: new DataSource.BookAPI(),
    AuthorAPI: new DataSource.AuthorAPI(),
  }),
  resolvers,
  tracing: false,
  cacheControl: {
    defaultMaxAge: 30,
  },
});

server.applyMiddleware({ app, path: '/graphql' });
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
