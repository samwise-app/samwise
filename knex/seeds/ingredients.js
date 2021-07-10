/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

const { tableLibrary } = require('../lib/tableLibrary');
const { ingredients } = require('../lib/dictionary');

const { ingredient } = tableLibrary.meal;

exports.seed = async (knex) => {
  return await knex(ingredient.tableName)
    .del()
    .then(() =>
      knex(ingredient.tableName).insert(
        ingredients.map((item, index) => {
          return {
            id: index,
            name: item,
          };
        })
      )
    );
};

