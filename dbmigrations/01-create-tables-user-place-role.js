/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable("user", (table) => {  //create new user table
        table.increments("user_id").primary();
        table.string("username");
        table.string("name");
        table.string("password");
        table.string("email");
        table.timestamp("created_at", { useTz: true }).notNullable();
      })
  
      .createTable("place", (table) => {  //create new user table
        table.increments("place_id").primary();
        table.integer("subject_id");
        table.string("place_name");
        table.string("place_desc");
        table.timestamp("created_at", { useTz: true }).notNullable();
      })
      
      .createTable("role", (table) => {  //create new user table
        table.increments("role_id").primary();
        table.string("role_name");
        table.string("role_desc");
        table.timestamp("created_at", { useTz: true }).notNullable();
      });
  };
  
  exports.down = (knex) => {
    return knex.raw("drop schema public cascade; create schema public;");
  };
  