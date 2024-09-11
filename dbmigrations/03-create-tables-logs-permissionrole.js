/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
    .createTable("user_subject", (table) => {  
      table.increments("user_subject_id").primary();
      table.integer("user_id").references("user_id").inTable("user");
      table.integer("subject_id").references("subject_id").inTable("subject");
      table.string("name");
      table.string("password");
      table.string("email");
      table.integer("created_by");
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
    })
      .createTable("user_log", (table) => {  
        table.increments("user_log_id").primary();
        table.integer("user_id").references("user_id").inTable("user");
        table.string("username");
        table.string("name");
        table.string("password");
        table.string("email");
        table.integer("created_by");
        table.timestamp("created_at", { useTz: true }).notNullable();
        table.timestamp("updated_at", { useTz: true }).notNullable();
      })
      .createTable("timetable_log", (table) => {  
            table.increments("timetrable_log_id").primary();
            table.integer("timetable_id").references("timetable_id").inTable("timetable");
            table.integer("subject_id");
            table.string("timetable_day");
            table.boolean("timetable_bool")
            table.string("password").notNullable();
            table.integer("updated_by");
            table.timestamp("timetable_time", { useTz: true }).notNullable();
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
          })
          .createTable("subject_log", (table) => {  
            table.increments("subject_log_id").primary();
            table.integer("subject_id").references("subject_id").inTable("subject");
            table.string("subject_name");
            table.string("subject_level");
            table.string("subject_lang");
            table.string("subject_desc");
            table.string("subject_type");
            table.integer("subject_price");
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
          })
          .createTable("user_subject_log", (table) => {  
            table.increments("user_subject_log_id").primary();
            table.integer("user_subject_id").references("user_subject_id").inTable("user_subject");
            table.integer("user_id");
            table.integer("subject_id");
            table.integer("updated_by");
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
          })
          .createTable("place_log", (table) => {  
            table.increments("place_log_id").primary();
            table.integer("place_id").references("place_id").inTable("place");
            table.integer("subject_id");
            table.string("place_name");
            table.string("place_desc");
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
          })
          .createTable("role_permission", (table) => {  
            table.increments("role_permission_id").primary();
            table.integer("role_id").references("role_id").inTable("role");
            table.integer("permission_id").references("permission_id").inTable("permission");
            table.timestamp("created_at", { useTz: true }).notNullable();
          });
  };
  
  exports.down = (knex) => {
    return knex.raw("drop schema public cascade; create schema public;");
  };
  