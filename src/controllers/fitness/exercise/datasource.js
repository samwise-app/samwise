/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource');

const Get = require('../../models/get');
const Create = require('../../models/create');
const Delete = require('../../models/delete');
const Update = require('../../models/update');

const { tableLibrary } = require('../../../lib/tableLibrary');
const { performGoogleAPISearch } = require('../~Third Party APIs/GoogleBooksAPI');

const { book: db_Book, book_author: db_JunctionTable, author: db_Author } = tableLibrary.knowledge.books;

const get = new Get(db_Book.tableName);
const create = new Create(db_Book.tableName);
const del = new Delete(db_Book.tableName);
const update = new Update(db_Book.tableName);

class BookAPI extends DataSource {
  constructor() {
    super();
    this.googleResults = [];
    this.databaseResults = [];
  }

  initialize(config) {
    this.context = config.context;
  }

  async createNewBook(args) {
    return { message: create.item(args.book_input) };
  }

  async deleteBook(id) {
    return { message: del.item(id) };
  }

  async updateBook(args) {
    const { authors, ...book } = args.book_input;
    return update.item(args.id, book);
  }

  async getAllBooks() {
    return get.allOf();
  }

  async getAllBooksWithAuthors() {
    return get.junctionTable(db_JunctionTable.tableName, db_Author.tableName, 'authors');
  }

  async getBook(args) {
    if (args.includeGoogleSearch) this.googleResults = await performGoogleAPISearch(args);
    this.databaseResults = await get.filterForThoseLike(args.book_input);

    this.databaseResults.forEach((book) => (book.from_database = true));
    return [...this.databaseResults, ...this.googleResults];
  }

  async getBookWithAuthors(args) {
    if (args.includeGoogleSearch) this.googleResults = await performGoogleAPISearch(args);
    this.databaseResults = await get.junctionTable(
      db_JunctionTable.tableName,
      db_Author.tableName,
      'authors',
      args.book_input
    );
    console.log(this.databaseResults);
    this.databaseResults.forEach((book) => (book.from_database = true));
    return [...this.databaseResults, ...this.googleResults];
  }

  async appendAuthorJunctionTable(bookID, authorID) {
    return create.junctionTable(
      db_JunctionTable.tableName,
      `${db_Book.tableName}_id`,
      `${db_Author.tableName}_id`,
      bookID,
      authorID
    );
  }
  async removeBookFromJunctionTable(id) {
    return del.junctionTable(db_JunctionTable.tableName, id);
  }
}

module.exports = BookAPI;
