const config = require('./config');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const { knex } = require('./knex');

const { typeDefs } = require('./controllers/graph-schema');
const { resolvers } = require('./controllers/graph-resolvers');
const { DataSource } = require('./controllers/graph-datasource');

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
  tracing: false,
  cacheControl: {
    defaultMaxAge: 30,
  },
});

// Outputs every database query
if (config.environment === 'development') {
  knex.on('query', (queryData) => {
    console.log('\x1b[95m%s\x1b[0m', queryData.sql);
    console.log('---- BREAK LINE -----');
  });
}

const api = require('./controllers/rest-router');

const app = express();
const middlewares = require('./middlewares');

if (config.environment === 'development') {
  app.use(morgan('dev'));
} else {
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'logs'),
  });
  app.use(morgan('combined', { stream: accessLogStream }));
}

// This is a fix for GraphIQL not loading
app.use(
  helmet({
    contentSecurityPolicy: config.environment === 'development' ? false : undefined,
  })
);

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    message: '🚀 Success! Your API is running! 🤘',
  });
});

server.applyMiddleware({ app, path: '/graphql' });
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = { app, server };
