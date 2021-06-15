/* eslint-disable implicit-arrow-linebreak */

const { asyncAdditiveArray } = require('../../../helpers/asyncHandler');

const resolvers = {
  Query: {
    allRecipes: async (_, __, { dataSources }, resolveInfo) => {
      return dataSources.RecipeAPI.getAllRecipes();
    },
    recipe: async (_, args, { dataSources }, resolveInfo) => {
      return dataSources.RecipeAPI.getRecipe(args);
    },
  },
  Mutation: {
    addRecipe: async (_, args, { dataSources }) => {
      // Adds any ingredients to the database which do not already exist & returns array with DB ID added
      let { result: ingredients, error } = await asyncAdditiveArray(
        args.recipe_input.ingredients,
        'meal_ingredient_id',
        getIngredientID,
        dataSources
      );
      console.log(ingredients);
      // Since there is no column for ingredients (since using a junction table), must remove this field from mutation
      delete args.recipe_input.ingredients;
      // Adds recipe to db
      const {
        data: meal_recipe_id,
        message,
        error: recipeError,
      } = await dataSources.RecipeAPI.createRecipe(args.recipe_input);
      if (recipeError) console.log(`${recipeError.code} ${recipeError.type}: ${message}`);
      // Adds data to junction table with recipe/ingredient marriage data
      Promise.all(
        ingredients.map(async ({ unit, meal_ingredient_id, amount }) => {
          // TODO Add error handling to GET functions & allow *adding* of units if it doesn't exist - like the ingredients handler
          const [{ id: unit_id }] = await dataSources.UnitAPI.getUnit({ name: unit });
          // TODO Add junction table error handling
          let inputs = {
            meal_ingredient_id,
            meal_recipe_id,
            amount,
            unit_id,
          };
          // console.log('INPUTS', inputs);
          await dataSources.RecipeAPI.joinRecipeAndIngredients(inputs);
        })
      );
      return { message };
    },
    deleteRecipe: async (_, args, { dataSources }) => {
      return dataSources.RecipeAPI.deleteRecipe(args.id);
    },
    updateRecipe: async (_, args, { dataSources }) => {
      return dataSources.RecipeAPI.updateRecipe(args);
    },
  },
};

const getIngredientID = async (ingredient, dataSources) => {
  let id;
  const [existingIngredient] = await dataSources.IngredientAPI.getIngredient({
    name: ingredient.name,
  });
  if (existingIngredient) {
    id = existingIngredient.id;
  } else {
    let { data } = await dataSources.IngredientAPI.createIngredient({
      name: ingredient.name,
    });
    id = data;
  }
  return id;
};

exports.resolvers = resolvers;
