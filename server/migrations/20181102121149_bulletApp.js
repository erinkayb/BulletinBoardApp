
//title- text
//description - text
//done(delete) - boolean
//date - datetime

exports.up = function(knex, Promise) {
  return knex.schema.createTable('bulletin', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('description');
    table.boolean('delete').defaultTo(false).notNullable();
    table.datetime('date').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bulletin')
};
