require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'samwise',
  },
});

module.exports = knex;
