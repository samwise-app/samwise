/** @param {import('knex').Knex} knex */
const { addDefaultColumns } = require('../lib/helpers');
const { tableLibrary } = require('../lib/tableLibrary');

const { unit } = tableLibrary.dictionary;

exports.up = async (knex) => {
  await knex.schema.createTable(unit.tableName, (table) => {
    table.increments();
    table.string(unit.columns.name).notNullable();
    addDefaultColumns(table);
  });
  await knex.schema.raw(
    `CREATE UNIQUE INDEX unique_unit ON ${unit.tableName}(${unit.columns.name}) WHERE deleted_at IS NULL`
  );
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(unit.tableName);
};
