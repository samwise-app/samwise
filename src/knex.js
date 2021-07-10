const { databases, environment } = require('./config');

const connection = environment === 'production' ? databases.production : databases.development;

const knex = require('knex')({
  client: 'pg',
  connection,
});

const test_knex = require('knex')({
  client: 'pg',
  connection: {
    host: databases.jest.host,
    user: databases.jest.user,
    password: databases.jest.password,
    databaseName: databases.jest.databaseName,
  },
});

module.exports = { knex, test_knex };
