/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */

const knex = require('../knex');

class Delete {
  constructor(table) {
    this.table = table;
  }

  async item(id) {
    return knex(this.table)
      .where({ id })
      .update('deleted_at', knex.raw('CURRENT_TIMESTAMP'))
      .then(() => 'Success!')
      .catch((err) => err);
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
