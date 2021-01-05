exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table) {
        table.increments('id').primary();

        table.string('image').notNullable();
        table.string('description', 200).notNullable();
        table.integer('favorites').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();

        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};