/** @param {import('knex').Knex} knex */
const { addDefaultColumns } = require('../lib/helpers');
const { tableLibrary } = require('../lib/tableLibrary');

const { user, role, role_user } = tableLibrary.core;

exports.up = async (knex) => {
  await knex.schema.createTable(user.tableName, (table) => {
    table.uuid('id').primary();
    table.string(user.columns.name, 40);
    table.string(user.columns.picture);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(role.tableName, (table) => {
    table.integer('id').primary();
    table.string(role.columns.name);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(role_user.tableName, (table) => {
    table.uuid('id').primary().notNullable();
    table
      .uuid(`${user.tableName}_id`)
      .unsigned()
      .references('id')
      .inTable(user.tableName)
      .onDelete('cascade')
      .notNullable();
    table
      .integer(`${role.tableName}_id`)
      .unsigned()
      .references('id')
      .inTable(role.tableName)
      .onDelete('cascade')
      .notNullable();
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(role_user.tableName);
  await knex.schema.dropTableIfExists(user.tableName);
  await knex.schema.dropTableIfExists(role.tableName);
};
