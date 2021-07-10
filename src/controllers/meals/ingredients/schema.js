const typeDefs = `

  ######### INPUTS #######

  input IngredientQueryInput{
    id:ID
    name: String
  }

  input IngredientMutationInput{
    name:String
    unit: String
    amount: Int
  }

  ######### TYPES #######

  type Ingredient {
    id:ID
    name:String
  }

  extend type Query {
    allIngredients: [Ingredient]
    ingredient(ingredient_input:IngredientQueryInput!): [Ingredient]
  }
  
  extend type Mutation {
    addIngredient(ingredient_input:IngredientMutationInput!): DatabaseResponse
    updateIngredient(id:ID!, ingredient_input:IngredientMutationInput!): DatabaseResponse
    deleteIngredient(id:ID!):DatabaseResponse
  }
`;

exports.typeDefs = typeDefs;
