/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable("user", (table) => {  //create new user table
        table.increments("user_id").primary();
        table.uuid("uuid").notNullable().unique();
        table.string("email").notNullable();
        table.string("name");
        table.string("password").notNullable();
        table.timestamp("created_at", { useTz: true }).notNullable();
        table.timestamp("updated_at", { useTz: true }).notNullable();
      });
  };
  
  exports.down = (knex) => {
    return knex.raw("drop schema public cascade; create schema public;");
  };
  