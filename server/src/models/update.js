/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */

const knex = require('../knex');

class Update {
  constructor(table) {
    this.table = table;
  }

  async item(id, args) {
    return knex(this.table)
      .where({ id })
      .update(args)
      .then(() => {
        message: 'Success!';
      })
      .catch((err) => err);
  }
}

module.exports = Update;
