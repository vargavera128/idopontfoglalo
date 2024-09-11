/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable("timetable", (table) => {  //create new user table
        table.increments("timetable_id").primary();
        table.integer("subject_id").references("subject_id").inTable("subject");
        table.string("timateble_day");
        table.boolean("timateble_bool");
        table.timestamp("timateble_time").notNullable();
        table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("permission", (table) => {  //create new user table
        table.increments("permission_id").primary();
        table.string("permission_name");
        table.string("permission_desc");
        table.timestamp("created_at", { useTz: true }).notNullable();
      });
  };
  
  exports.down = (knex) => {
    return knex.raw("drop schema public cascade; create schema public;");
  };
  