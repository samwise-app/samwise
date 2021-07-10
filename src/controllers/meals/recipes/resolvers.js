/* eslint-disable implicit-arrow-linebreak */

const { asyncAdditiveArray } = require('../../../helpers/asyncHandler');

const resolvers = {
  Query: {
    allRecipes: async (_, __, { dataSources }) => {
      return dataSources.RecipeAPI.getAllRecipes();
    },
    recipe: async (_, args, { dataSources }) => {
      return dataSources.RecipeAPI.getRecipe(args);
    },
  },
  Mutation: {
    addRecipe: async (_, args, { dataSources }) => {
      // Adds any ingredients to the database which do not already exist & returns array with DB ID added
      let { result: ingredients, error } = await asyncAdditiveArray(
        args.recipe_input.ingredients,
        getIDs,
        dataSources
      );
      // Since there is no column for ingredients (since using a junction table), must remove this field from mutation
      delete args.recipe_input.ingredients;
      // Adds recipe to db
      const {
        data: meal_recipe_id,
        message,
        error: recipeError,
      } = await dataSources.RecipeAPI.createRecipe(args.recipe_input);
      // Adds data to junction table with recipe/ingredient marriage data
      let {result, error:finalError} = await handleJunctionInput(ingredients,meal_recipe_id, dataSources.RecipeAPI.joinRecipeAndIngredients)
      return { message };
    },
    deleteRecipe: async (_, args, { dataSources }) => {
      // TODO Include deletion of junction table data
      return dataSources.RecipeAPI.deleteRecipe(args.id);
    },
    updateRecipe: async (_, args, { dataSources }) => {
      return dataSources.RecipeAPI.updateRecipe(args);
    },
  },
};

async function handleJunctionInput(array, meal_recipe_id, callback) {
  let result = [];
  let error;
  for (let i = 0; i < array.length; i += 1) {
    try {
      const {meal_ingredient_id, amount, unit_id} = array[i]
      const result = await callback({meal_recipe_id, meal_ingredient_id, amount, unit_id});
    } catch (error) {
      console.error(error);
    }
  }
  return { result, error };
}

const getIDs = async (ingredient, dataSources) => {
  let meal_ingredient_id;
  const [existingIngredient] = await dataSources.IngredientAPI.getIngredient({
    name: ingredient.name,
  });
  const [existingUnit] = await dataSources.UnitAPI.getUnit({
    name: ingredient.unit,
  });
  if (existingIngredient) {
    meal_ingredient_id = existingIngredient.id;
  } else {
    let { data } = await dataSources.IngredientAPI.createIngredient({
      name: ingredient.name,
    });
    meal_ingredient_id = data;
  }
  if(existingUnit) {
    unit_id = existingUnit.id;
  } else {
    let { data } = await dataSources.UnitAPI.createUnit({
      name: ingredient.unit,
    });
    unit_id = data;
  }
  return {meal_ingredient_id, unit_id};
};

exports.resolvers = resolvers;
