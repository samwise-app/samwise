/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */

const knex = require('../knex');

class Create {
  constructor(table) {
    this.table = table;
  }

  async item(args) {
    return knex(this.table)
      .returning('id')
      .insert(args)
      .then((id) => {
        return { message: 'Success!', id };
      })
      .catch((err) => err);
  }

  async junctionTable(table, column1, column2, id1, id2) {
    return knex(table).insert([{ [column1]: id1, [column2]: id2 }]);
  }
}

module.exports = Create;
