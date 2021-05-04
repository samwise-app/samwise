/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource');

const Get = require('../../models/get');
const Create = require('../../models/create');
const Delete = require('../../models/delete');
const Update = require('../../models/update');

const { tableLibrary } = require('../../../knex/lib/tableLibrary');
const { performGoogleAPISearch } = require('../~Third Party APIs/GoogleBooksAPI');

const { book: db_Book, book_author: db_JunctionTable, author: db_Author } = tableLibrary.knowledge.books;

const get = new Get(db_Author.tableName);
const create = new Create(db_Author.tableName);
const del = new Delete(db_Author.tableName);
const update = new Update(db_Author.tableName);

class AuthorAPI extends DataSource {
  constructor() {
    super();
    this.googleResults = [];
    this.databaseResults = [];
  }

  initialize(config) {
    this.context = config.context;
  }

  async createNewAuthor(args) {
    if (args.new) delete args.new && delete args.id;
    return create.item(args);
  }

  async deleteAuthor(id) {
    return { message: del.item(id) };
  }

  async updateAuthor(args) {
    return { message: update.item(args.id, args.author_input) };
  }

  async getAllAuthors() {
    return get.allOf();
  }

  async getAllAuthorsWithBooks() {
    return get.junctionTable(db_JunctionTable.tableName, db_Book.tableName, 'books');
  }

  async getAuthor(args) {
    if (args.includeGoogleSearch) this.googleResults = await performGoogleAPISearch(args);
    this.databaseResults = await get.filterForThoseLike(args.author_input);
    return [...this.databaseResults, ...this.googleResults];
  }

  async getAuthorWithBooks(args) {
    if (args.includeGoogleSearch) this.googleResults = await performGoogleAPISearch(args);
    this.databaseResults = await get.junctionTable(
      db_JunctionTable.tableName,
      db_Book.tableName,
      'books',
      args.author_input
    );
    return [...this.databaseResults, ...this.googleResults];
  }
}

module.exports = AuthorAPI;
