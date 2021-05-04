/* eslint-disable arrow-body-style */
const addDefaultColumns = (table) => {
  table.timestamps(false, true);
  table.datetime('deleted_at');
};

const createNameTable = (knex, table_name) => {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    addDefaultColumns(table);
  });
};

const references = (table, reference_table, nullable, customColumnName) => {
  table
    .integer(`${customColumnName || reference_table}_id`)
    .unsigned()
    .references('id')
    .inTable(reference_table)
    .onDelete('cascade')
    .nullable(nullable);
};

const createJunctionTable = (knex, table_name, first_table, second_table) => {
  const secondColumnName = first_table === second_table ? `reference_${first_table}` : second_table;
  return knex.schema.createTable(table_name, (table) => {
    table.integer('id').notNullable();
    references(table, first_table, false);
    references(table, second_table, false, secondColumnName);
    addDefaultColumns(table);
  });
};

const createTimeTables = (knex, table_name, reference_table) => {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable();
    table.integer('count').notNullable().unique();
    references(table, reference_table, false);
    addDefaultColumns(table);
  });
};

exports.addDefaultColumns = addDefaultColumns;
exports.createNameTable = createNameTable;
exports.references = references;
exports.createJunctionTable = createJunctionTable;
exports.createTimeTables = createTimeTables;
