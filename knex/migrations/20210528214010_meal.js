/** @param {import('knex').Knex} knex */

const { addDefaultColumns, createJunctionTable } = require('../lib/helpers');
const { tableLibrary } = require('../lib/tableLibrary');

const { ingredient, ingredient_recipe, recipe } = tableLibrary.meal;

exports.up = async (knex) => {
  await knex.schema.createTable(recipe.tableName, (table) => {
    table.increments();
    table.string(recipe.columns.name).notNullable();
    table.string(recipe.columns.description);
    table.string(recipe.columns.recipe_url);
    table.string(recipe.columns.image_url);
    table.integer(recipe.columns.serving_size);
    table.integer(recipe.columns.calories_per_serving);
    table.json(recipe.columns.steps).notNullable();
    table.integer(recipe.columns.average_cost);
    table.string(recipe.columns.complexity);
    table.integer(recipe.columns.hours_required);
    table.integer(recipe.columns.minutes_required);
    table.boolean(recipe.columns.multiple_days);
    table.string(recipe.columns.preferred_cook);
    table.boolean(recipe.columns.dinnerable).defaultTo(false);
    table.boolean(recipe.columns.lunchable).defaultTo(false);
    table.boolean(recipe.columns.breakfastable).defaultTo(false);
    table.boolean(recipe.columns.snackable).defaultTo(false);
    table.boolean(recipe.columns.drinkable).defaultTo(false);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(ingredient.tableName, (table) => {
    table.increments();
    table.string(ingredient.columns.name).notNullable();
    table.integer(ingredient.columns.calories);
    table.integer(ingredient.columns.fat);
    table.integer(ingredient.columns.carbs);
    table.integer(ingredient.columns.protein);
    addDefaultColumns(table);
  });
  await createJunctionTable(knex, ingredient_recipe.tableName, ingredient.tableName, recipe.tableName);
  await knex.schema.alterTable(ingredient_recipe.tableName, (table) => {
    table.integer(ingredient_recipe.columns.amount);
    table.integer(ingredient_recipe.columns.unit_id);
    table
      .foreign(ingredient_recipe.columns.unit_id)
      .references('id')
      .inTable(tableLibrary.dictionary.unit.tableName);
  });
  await knex.schema.raw(
    `CREATE UNIQUE INDEX unique_ingredient ON ${ingredient.tableName}(${ingredient.columns.name}) WHERE deleted_at IS NULL`
  );
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(ingredient_recipe.tableName);
  await knex.schema.dropTableIfExists(ingredient.tableName);
  await knex.schema.dropTableIfExists(recipe.tableName);
};
