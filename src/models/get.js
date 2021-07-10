/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
const { knex } = require('../knex');

console.log(knex.client.connectionSettings);
class Get {
  constructor(table) {
    this.table = table;
  }

  allOf() {
    return knex(this.table).select('*').where('deleted_at', null);
  }

  exact(input) {
    return knex(this.table).select('*').where('deleted_at', null).where(input);
  }

  async filterWithAnds(inputs) {
    let query = knex(this.table).select('*').where('deleted_at', null);
    Object.entries(inputs).forEach(([key, value]) => {
      switch (typeof value) {
        case 'boolean':
          query = query.where(key, value);
          break;
        case 'number':
          query = query.where(key, value);
          break;
        case 'string':
          query = query.where(key, 'ILIKE', `%${value}%`);
          break;
        case 'object':
          query = query.where(key, value.operator, `${value.parameter}`);
          break;
        default:
          break;
      }
    });
    return query;
  }

  // async junctionTable(junctionTable, joinTable, newFieldName, filter) {
  //   const query = knex(junctionTable)
  //     .select(`${this.table}.*`, knex.raw(`ARRAY_AGG(row_to_json(${joinTable}.*))as ${newFieldName}`))
  //     .innerJoin(`${joinTable}`, `${junctionTable}.${joinTable}_id`, '=', `${joinTable}.id`)
  //     .innerJoin(`${this.table}`, `${junctionTable}.${this.table}_id`, '=', `${this.table}.id`)
  //     .where(`${this.table}.deleted_at`, null)
  //     .where(`${joinTable}.deleted_at`, null)
  //     .groupBy(`${this.table}.id`);
  //   if (filter) this.helperChainLikes(query, filter);
  //   return query;
  // }
}

module.exports = Get;
