/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource');

const Get = require('../../../models/get');
const Create = require('../../../models/create');
const Delete = require('../../../models/delete');
const Update = require('../../../models/update');

const { tableLibrary } = require('../../../../knex/lib/tableLibrary');

const { unit: db_Unit } = tableLibrary.dictionary;

const get = new Get(db_Unit.tableName);
const create = new Create(db_Unit.tableName);
const del = new Delete(db_Unit.tableName);
const update = new Update(db_Unit.tableName);

class UnitAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  createUnit(params) {
    return create.item(params);
  }

  deleteUnit(id) {
    return del.item(id);
  }

  updateUnit(id, params) {
    return update.item(id, params);
  }

  getAllUnits() {
    return get.allOf();
  }

  getUnit(params) {
    // Converts string from graphQL "ID"/String Schema to DB integer ID column
    if (params.id) params.id = parseInt(params.id);
    return get.filterWithAnds(params);
  }
}

module.exports = UnitAPI;
