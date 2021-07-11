/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const { v4: uuid } = require('uuid');

const { tableLibrary } = require('../../src/lib/tableLibrary');

const { user, role, role_user } = tableLibrary.core;

const userID = uuid();
const junctionID = uuid();

exports.seed = async (knex) => {
  return (
    await knex(user.tableName)
      .del()
      .then(() =>
        // Inserts seed entries
        knex(user.tableName).insert([
          {
            id: userID,
            name: 'Derek',
          },
        ])
      ),
    await knex(role.tableName)
      .del()
      .then(() =>
        knex(role.tableName).insert([
          {
            id: 1,
            name: 'Admin',
          },
        ])
      ),
    await knex(role_user.tableName)
      .del()
      .then(() =>
        knex(role_user.tableName).insert([
          {
            id: junctionID,
            core_user_id: userID,
            core_role_id: 1,
          },
        ])
      )
  );
};
