const typeDefs = `

  ######### INPUTS #######

  input UnitQueryInput{
    id:ID
    name: String
  }

  input UnitMutationInput{
    name:String
  }

  ######### TYPES #######

  type Unit {
    id:ID
    name:String
  }

  extend type Query {
    allUnits: [Unit]
    unit(unit_input:UnitQueryInput!): [Unit]
  }
  
  extend type Mutation {
    addUnit(unit_input:UnitMutationInput!): DatabaseResponse
    updateUnit(id:ID!, unit_input:UnitMutationInput!): DatabaseResponse
    deleteUnit(id:ID!):DatabaseResponse
  }
`;

exports.typeDefs = typeDefs;
