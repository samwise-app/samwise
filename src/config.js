require('dotenv').config();

const environment = 'development';

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

const databases = {
  jest: {
    host: process.env.JEST_DB_HOST,
    user: process.env.JEST_DB_USER,
    password: process.env.JEST_DB_PASSWORD,
    databaseName: process.env.JEST_DB_NAME,
  },
  development: {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    databaseName: process.env.DEV_DB_NAME,
  },
  production: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_NAME,
  },
};

const externalAPI = {
  googleBooksAPIKey: process.env.GOOGLE_BOOKS_API_KEY,
};

const knexConnection = environment === 'production' ? databases.production : databases.development;

const knex = require('knex')({
  client: 'pg',
  knexConnection,
});

const test_knex = require('knex')({
  client: 'pg',
  connection: databases.jest,
});

module.exports = { databases, environment, externalAPI, port, hostname, knex, test_knex };
