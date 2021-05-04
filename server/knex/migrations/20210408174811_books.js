/** @param {import('knex').Knex} knex */
const { addDefaultColumns, createJunctionTable } = require('../lib/helpers');
const { tableLibrary } = require('../lib/tableLibrary');

const { book, author } = tableLibrary.knowledge.books;

exports.up = async (knex) => {
  await knex.schema.createTable(
    tableLibrary.knowledge.books.book.tableName,
    (table) => {
      table.increments();
      table.string(book.columns.title).notNullable();
      table.string(book.columns.isbn_10).notNullable().defaultTo(1);
      table.string(book.columns.isbn_13).notNullable().defaultTo(1);
      table.string(book.columns.image);
      table.string(book.columns.description);
      table.specificType(book.columns.vector, 'tsvector');
      table.boolean(book.columns.has_been_read).notNullable().defaultTo(false);
      table.json(book.columns.notes);
      addDefaultColumns(table);
    }
  );
  await knex.schema.createTable(
    tableLibrary.knowledge.books.author.tableName,
    (table) => {
      table.increments();
      table.string(author.columns.first_name);
      table.string(author.columns.middle_name);
      table.string(author.columns.last_name).notNullable();
      table.string(author.columns.full_name).notNullable();
      addDefaultColumns(table);
    }
  );
  await createJunctionTable(
    knex,
    tableLibrary.knowledge.books.book_author.tableName,
    book.tableName,
    author.tableName
  );
  await knex.schema.alterTable(tableLibrary.core.user.tableName, (table) => {
    table.integer(tableLibrary.core.user.columns.active_book);
    table
      .foreign(tableLibrary.core.user.columns.active_book)
      .references('id')
      .inTable(book.tableName);
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable(tableLibrary.core.user.tableName, (table) => {
    table.dropForeign(tableLibrary.core.user.columns.active_book);
  });
  await knex.schema.dropTableIfExists(
    tableLibrary.knowledge.books.book_author.tableName
  );
  await knex.schema.dropTableIfExists(author.tableName);
  await knex.schema.dropTableIfExists(book.tableName);
};
