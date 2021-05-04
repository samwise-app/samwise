/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
const knex = require('../knex');

class Get {
  constructor(table) {
    this.table = table;
  }

  async allOf() {
    return knex(this.table).select('*').where('deleted_at', null);
  }

  async allOfColumn(column) {
    return knex(this.table).select(column).where('deleted_at', null);
  }

  async filterForAllExact(params) {
    return knex(this.table).select('*').where(params).where('deleted_at', null);
  }

  async filterForOneOfExact(filter) {
    const query = knex(this.table).select('*').where('deleted_at', null);
    this.helperChainExacts(query, filter);
    return query;
  }

  async filterForThoseLike(filter) {
    const query = knex(this.table).select('*').where('deleted_at', null);
    this.helperChainLikes(query, filter);
    return query;
  }

  async junctionTable(junctionTable, joinTable, newFieldName, filter) {
    const query = knex(junctionTable)
      .select(`${this.table}.*`, knex.raw(`ARRAY_AGG(row_to_json(${joinTable}.*))as ${newFieldName}`))
      .innerJoin(`${joinTable}`, `${junctionTable}.${joinTable}_id`, '=', `${joinTable}.id`)
      .innerJoin(`${this.table}`, `${junctionTable}.${this.table}_id`, '=', `${this.table}.id`)
      .where(`${this.table}.deleted_at`, null)
      .where(`${joinTable}.deleted_at`, null)
      .groupBy(`${this.table}.id`);
    if (filter) this.helperChainLikes(query, filter);
    return query;
  }

  helperChainLikes(query, filter) {
    Object.entries(filter).forEach(async ([key, value]) => {
      query = query.where(key, 'ILIKE', `%${value}%`);
    });
    return query;
  }

  helperChainExacts(query, filter) {
    Object.entries(filter).forEach(async ([key, value]) => {
      query = query.orWhere(key, value);
    });
    return query;
  }
}

module.exports = Get;
