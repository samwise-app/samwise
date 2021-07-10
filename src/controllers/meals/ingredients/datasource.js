/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource');

const Get = require('../../../models/get');
const Create = require('../../../models/create');
const Delete = require('../../../models/delete');
const Update = require('../../../models/update');

const { tableLibrary } = require('../../../../knex/lib/tableLibrary');

const { ingredient: db_Ingredient } = tableLibrary.meal;

const get = new Get(db_Ingredient.tableName);
const create = new Create(db_Ingredient.tableName);
const del = new Delete(db_Ingredient.tableName);
const update = new Update(db_Ingredient.tableName);

class IngredientAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  createIngredient(params) {
    return create.item(params);
  }

  deleteIngredient(id) {
    return del.item(id);
  }

  updateIngredient(id, params) {
    return update.item(id, params);
  }

  getAllIngredients() {
    return get.allOf();
  }

  getIngredient(params) {
    // Converts string from graphQL "ID"/String Schema to DB integer ID column
    if (params.id) params.id = parseInt(params.id);
    return get.filterWithAnds(params);
  }
}

module.exports = IngredientAPI;
