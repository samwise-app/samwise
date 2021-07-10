const { databases } = require('./src/config');

const production = {
  host: databases.production.POSTGRES_HOST,
  user: databases.production.POSTGRES_USER,
  password: databases.production.POSTGRES_PASSWORD,
  database: databases.production.POSTGRES_DB,
  port: databases.production.POSTGRES_PORT,
};

const development = {
  host: databases.development.DEV_POSTGRES_HOST,
  user: databases.development.DEV_POSTGRES_USER,
  password: databases.development.DEV_POSTGRES_PASSWORD,
  database: databases.development.DEV_POSTGRES_DB,
  port: databases.development.DEV_POSTGRES_PORT,
};

const jest = {
  host: databases.jest.JEST_POSTGRES_HOST,
  user: databases.jest.JEST_POSTGRES_USER,
  password: databases.jest.JEST_POSTGRES_PASSWORD,
  database: databases.jest.JEST_POSTGRES_DB,
  port: databases.jest.JEST_POSTGRES_PORT,
};

module.exports = {
  jest: {
    client: 'pg',
    jest,
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds',
    },
  },
  development: {
    client: 'pg',
    development,
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds',
    },
  },
  production: {
    client: 'pg',
    production,
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds',
    },
  },
};
