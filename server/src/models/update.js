/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */

const knex = require('../knex');
const errorHandler = require('../helpers/errorHandler');

class Update {
  constructor(table) {
    this.table = table;
    this.data = {};
    this.error = '';
    this.message = '';
  }

  async item(id, args) {
    knex(this.table)
      .where({ id })
      .update(args)
      .update('updated_at', knex.raw('CURRENT_TIMESTAMP'))
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
}


module.exports = Update;
