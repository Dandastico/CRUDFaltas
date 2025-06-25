exports.up = function(knex) {
  return knex.schema.createTable('faltas', table => {
    table.increments('id').primary();
    table.string('nome', 50).notNullable();
    table.date('dia').defaultTo(knex.raw('(CURRENT_DATE)'));
    table.decimal('valor', 3, 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('faltas');
};