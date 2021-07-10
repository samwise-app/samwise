require('dotenv').config();

const environment = 'development';

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

const databases = {
  jest: {
    host: process.env.JEST_DB_HOST,
    user: process.env.JEST_DB_USER,
    password: process.env.JEST_DB_PASSWORD,
    databaseName: 'samwise-testing',
  },
  development: {
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    databaseName: 'samwise-development',
  },
  production: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: 'samwise',
  },
};

const externalAPI = {
  googleBooksAPIKey: process.env.GOOGLE_BOOKS_API_KEY,
};

module.exports = { databases, environment, externalAPI, port, hostname };
