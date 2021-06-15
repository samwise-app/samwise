/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */

const knex = require('../knex');
const errorHandler = require('../helpers/errorHandler');

class Create {
  constructor(table) {
    this.table = table;
    this.data = {};
    this.error = '';
    this.message = '';
  }

  async item(args) {
    await knex(this.table)
      .returning('id')
      .insert(args)
      .then((id) => {
        this.data = id[0];
        this.message = 'Success!';
      })
      .catch((err) => {
        let { error, message } = errorHandler(err.detail);
        this.error = error;
        this.message = message;
      });
    return { data: this.data, error: this.error, message: this.message };
  }

  async junctionTable(table, args) {
    console.log(table, args);
    return knex(table)
      .insert(args)
      .then(() => {
        return { message: 'Success!' };
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Create;
