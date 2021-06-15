/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource');

const Get = require('../../../models/get');
const Create = require('../../../models/create');
const Delete = require('../../../models/delete');
const Update = require('../../../models/update');

const { tableLibrary } = require('../../../../knex/lib/tableLibrary');

const { recipe: db_Recipe, ingredient_recipe: db_Junc } = tableLibrary.meal;

const get = new Get(db_Recipe.tableName);
const create = new Create(db_Recipe.tableName);
const del = new Delete(db_Recipe.tableName);
const update = new Update(db_Recipe.tableName);

class RecipeAPI extends DataSource {
  constructor() {
    super();
    this.databaseResults = [];
  }

  initialize(config) {
    this.context = config.context;
  }

  createRecipe(params) {
    return create.item(params);
  }

  deleteRecipe(id) {
    return del.item(id);
  }

  updateRecipe(id, params) {
    return update.item(id, params);
  }

  getAllRecipes() {
    return get.allOf();
  }

  getRecipe(params) {
    return get.filterWithAnds(params);
  }

  joinRecipeAndIngredients(inputs) {
    return create.junctionTable(db_Junc.tableName, inputs);
  }
}

module.exports = RecipeAPI;
