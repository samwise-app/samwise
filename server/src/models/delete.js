/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */

const knex = require('../knex');
const errorHandler = require('../helpers/errorHandler');

class Delete {
  constructor(table) {
    this.table = table;
    this.data = {};
    this.error = '';
    this.message = '';
  }

  async item(id) {
    knex(this.table)
      .where({ id })
      .update('deleted_at', knex.raw('CURRENT_TIMESTAMP'))
      .then(() => {
        this.message = 'Success!';
      })
      .catch((err) => {
        let { type, message } = errorHandler(err.detail);
        this.error = type;
        this.message = message;
      });
    return { data: this.data, error: this.error, message: this.message };
  }

  async junctionTable(junctionTable, id) {
    return knex(junctionTable)
      .where(`${this.table}_id`, id)
      .update('deleted_at', knex.raw('CURRENT_TIMESTAMP'))
      .then(() => 'Success')
      .catch((err) => err);
  }
}

module.exports = Delete;
