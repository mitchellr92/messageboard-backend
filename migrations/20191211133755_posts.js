exports.up = function(knex) {
  return knex.schema.createTable("posts", table => {
    table.increments();
    table.string("title").notNullable();
    table.string("body").notNullable();
  });
};

exports.down = function(knex) {};
