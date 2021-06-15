/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

const { tableLibrary } = require('../lib/tableLibrary');
const { units } = require('../lib/dictionary');

const { unit } = tableLibrary.dictionary;

exports.seed = async (knex) => {
  return await knex(unit.tableName)
    .del()
    .then(() =>
      knex(unit.tableName).insert(
        units.map((item, index) => {
          return {
            id: index,
            name: item,
          };
        })
      )
    );
};

