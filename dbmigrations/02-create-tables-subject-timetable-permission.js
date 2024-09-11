/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable("subject", (table) => {  //create new user table
        table.increments("subject_id").primary();
        table.string("subject_name");
        table.string("subject_level");
        table.string("subject_lang");
        table.string("subject_desc");
        table.string("subject_type");
        table.integer("subject_price");
        table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("timetable", (table) => {  //create new user table
        table.increments("timetable_id").primary();
        table.integer("subject_id");
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
  