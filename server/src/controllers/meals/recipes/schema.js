const typeDefs = `

  ######### INPUTS #######

  input IntegerComparison{
    operator: String
    parameter: Int
  }

  input RecipeQueryInput{
    id:ID
    name: String
    description: String
    recipe_url: String
    image_url: String
    serving_size:IntegerComparison
    calories_per_serving: IntegerComparison
    average_cost: IntegerComparison
    complexity: String
    hours_required: IntegerComparison
    minutes_required: IntegerComparison
    multiple_days: Boolean
    preferred_cook: String
    dinnerable: Boolean
    lunchable: Boolean
    breakfastable: Boolean
    snackable: Boolean
    drinkable: Boolean
  }

  input RecipeMutationInput{
    name: String!
    ingredients: [IngredientMutationInput]!
    description: String
    recipe_url: String
    image_url: String
    serving_size:Int
    calories_per_serving: Int
    steps: JSON
    average_cost: Int
    complexity: String
    hours_required: Int
    minutes_required: Int
    multiple_days: Boolean
    preferred_cook: String
    dinnerable: Boolean
    lunchable: Boolean
    breakfastable: Boolean
    snackable: Boolean
    drinkable: Boolean
  }

  ######### TYPES #######

  type Recipe {
    id:ID
    name: String
    ingredients: [Ingredient]!
    description: String
    recipe_url: String
    image_url: String
    serving_size:Int
    calories_per_serving: Int
    steps: JSON
    average_cost: Int
    complexity: String
    hours_required: Int
    minutes_required: Int
    multiple_days: Boolean
    preferred_cook: String
    dinnerable: Boolean
    lunchable: Boolean
    breakfastable: Boolean
    snackable: Boolean
    drinkable: Boolean
  }

  extend type Query {
    allRecipes: [Recipe]
    recipe(recipe_input:RecipeQueryInput!): [Recipe]
  }
  
  extend type Mutation {
    addRecipe(recipe_input:RecipeMutationInput!): DatabaseResponse
    updateRecipe(id:ID!, recipe_input:RecipeMutationInput!): DatabaseResponse
    deleteRecipe(id:ID!):DatabaseResponse
  }
`;



exports.typeDefs = typeDefs;
