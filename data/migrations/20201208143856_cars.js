exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    //primary key
    table.increments();

    //required
    table.text("vin", 128).unique().notNullable();
    table.text("make", 128).notNullable();
    table.text("model", 128).notNullable();
    table.integer("mileage").notNullable();

    //not required
    table.text("transmission");
    table.text("status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
