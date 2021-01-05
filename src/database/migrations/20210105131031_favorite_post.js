
exports.up = function(knex) {
    return knex.schema.createTable('favorite_post', function(table) {
        table.increments('id').primary();

        table.boolean('favorited').notNullable();

        table.integer('user_id').unsigned().notNullable();
        table.integer('post_id').unsigned().notNullable();

        table.foreign('user_id').references('id').inTable('users');
        table.foreign('post_id').references('id').inTable('posts');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('favorite_post');
};
