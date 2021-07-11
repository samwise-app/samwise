/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

const { tableLibrary } = require('../../src/lib/tableLibrary');

const { book, author, book_author } = tableLibrary.knowledge.books;

exports.seed = async (knex) => {
  return (
    await knex(book.tableName)
      .del()
      .then(() =>
        knex(book.tableName).insert([
          {
            id: 1,
            title: 'A Short History of Nearly Everything',
            isbn_10: '076790818X',
            isbn_13: '978-0767908184',
            has_been_read: true,
          },
        ])
      ),
    await knex(author.tableName)
      .del()
      .then(() =>
        knex(author.tableName).insert([
          {
            id: 1,
            full_name: 'Bill Bryson',
            first_name: 'Bill',
            last_name: 'Bryson',
          },
        ])
      ),
    await knex(book_author.tableName)
      .del()
      .then(() =>
        knex(book_author.tableName).insert([
          {
            id: 1,
            knowledge_books_book_id: 1,
            knowledge_books_author_id: 1,
          },
        ])
      )
  );
};
