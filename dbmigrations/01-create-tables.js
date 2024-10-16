/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
      .createTable("subject", (table) => {  //create subject table
          table.increments("subject_id").primary();
          table.string("subject_name");
          table.string("subject_level");
          table.string("subject_lang");
          table.string("subject_desc");
          table.string("subject_type");
          table.integer("subject_price");
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("user", (table) => {  //create user table
          table.increments("user_id").primary();
          table.string("username");
          table.string("name");
          table.string("password");
          table.string("email");
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("role", (table) => {  //create role table
          table.increments("role_id").primary();
          table.string("role_name");
          table.string("role_desc");
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("timetable", (table) => {  //create timetable table
          table.increments("timetable_id").primary();
          table.integer("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE');
          table.string("timetable_day");
          table.boolean("timetable_bool");
          table.time('start_time').notNullable();
          table.time('end_time').notNullable();
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("permission", (table) => {  //create permission table
          table.increments("permission_id").primary();
          table.string("permission_name");
          table.string("permission_desc");
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      /*.createTable("user_subject", (table) => {  //create user_subject table
          table.increments("user_subject_id").primary();
          table.integer("user_id").references("user_id").inTable("user").onDelete('CASCADE').onUpdate('CASCADE');
          table.integer("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE').onUpdate('CASCADE');
          table.timestamp("created_at", { useTz: true }).notNullable();
      })*/
      .createTable("user_log", (table) => {  //create user_log table
          table.increments("user_log_id").primary();
          table.integer("user_id").references("user_id").inTable("user").onDelete('CASCADE').onUpdate('CASCADE');
          table.string("username");
          table.string("name");
          table.string("password");
          table.string("email");
          table.string("operation");
          table.integer("created_by");
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("timetable_log", (table) => {  //create timetable_log table
          table.increments("timetable_log_id").primary();
          table.integer("timetable_id").references("timetable_id").inTable("timetable").onDelete('CASCADE').onUpdate('CASCADE');
          table.integer("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE').onUpdate('CASCADE');
          table.string("timetable_day");
          table.boolean("timetable_bool");
          table.time('start_time').notNullable();
          table.time('end_time').notNullable();
          table.string("operation");
          table.integer("created_by");
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("subject_log", (table) => {  //create subject_log table
          table.increments("subject_log_id").primary();
          table.integer("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE').onUpdate('CASCADE');
          table.string("subject_name");
          table.string("subject_level");
          table.string("subject_lang");
          table.string("subject_desc");
          table.string("subject_type");
          table.integer("subject_price");
          table.string("operation");
          table.integer("created_by");
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      /*.createTable("user_subject_log", (table) => {  //create user_subject_log table
          table.increments("user_subject_log_id").primary();
          table.integer("user_subject_id").references("user_subject_id").inTable("user_subject").onDelete('CASCADE').onUpdate('CASCADE');
          table.integer("user_id").references("user_id").inTable("user").onDelete('CASCADE').onUpdate('CASCADE');
          table.integer("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE').onUpdate('CASCADE');
          table.string("operation");
          table.integer("created_by");
          table.timestamp("created_at", { useTz: true }).notNullable();
      })*/
      .createTable("role_permission", (table) => {  //create role_permission table
          table.increments("role_permission_id").primary();
          table.integer("role_id").references("role_id").inTable("role").onDelete('CASCADE').onUpdate('CASCADE');
          table.integer("permission_id").references("permission_id").inTable("permission").onDelete('CASCADE').onUpdate('CASCADE');
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("user_role", (table) => {  //create user_role table
          table.increments("user_role_id").primary();
          table.integer("user_id").references("user_id").inTable("user").onDelete('CASCADE').onUpdate('CASCADE');
          table.integer("role_id").references("role_id").inTable("role").onDelete('CASCADE').onUpdate('CASCADE');
          table.timestamp("created_at", { useTz: true }).notNullable();
      })
      .createTable("booking", (table) => {  //create booking table
        table.increments("booking_id").primary();
        table.integer("user_id").references("user_id").inTable("user").onDelete('CASCADE').onUpdate('CASCADE');
        table.integer("timetable_id").references("timetable_id").inTable("timetable").onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamp("booked_at", { useTz: true }).notNullable();
    })
      

      //TRIGGERS
      .then(() => knex.raw(`  
          CREATE OR REPLACE FUNCTION log_user_changes() 
          RETURNS TRIGGER AS $$
          BEGIN
              IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
                  INSERT INTO user_log (
                      user_id, 
                      username, 
                      name, 
                      password, 
                      email, 
                      operation,
                      created_by, 
                      created_at
                  )
                  VALUES (
                      NEW.user_id, 
                      NEW.username, 
                      NEW.name, 
                      NEW.password, 
                      NEW.email, 
                      TG_OP,  -- INSERT/UPDATE művelet
                      COALESCE(current_setting('myapp.current_user', true)::integer, 0),
                      NOW()
                  );
                  RETURN NEW;
              END IF;
              RETURN NULL;
          END;
          $$ LANGUAGE plpgsql;
          
          CREATE TRIGGER user_changes_trigger
          AFTER INSERT OR UPDATE ON "user"
          FOR EACH ROW
          EXECUTE FUNCTION log_user_changes();
      `))
      .then(() => knex.raw(`
          CREATE OR REPLACE FUNCTION log_subject_changes() 
          RETURNS TRIGGER AS $$
          BEGIN
              IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
                  INSERT INTO subject_log (
                      subject_id, 
                      subject_name, 
                      subject_level, 
                      subject_lang, 
                      subject_desc, 
                      subject_type, 
                      subject_price, 
                      operation,
                      created_by, 
                      created_at
                  )
                  VALUES (
                      NEW.subject_id, 
                      NEW.subject_name, 
                      NEW.subject_level, 
                      NEW.subject_lang, 
                      NEW.subject_desc, 
                      NEW.subject_type, 
                      NEW.subject_price, 
                      TG_OP,  -- INSERT/UPDATE művelet
                      COALESCE(current_setting('myapp.current_user', true)::integer, 0),
                      NOW()
                  );
                  RETURN NEW;
              END IF;
              RETURN NULL;
          END;
          $$ LANGUAGE plpgsql;

          CREATE TRIGGER subject_changes_trigger
          AFTER INSERT OR UPDATE ON "subject"
          FOR EACH ROW
          EXECUTE FUNCTION log_subject_changes();
      `))
      .then(() => knex.raw(`
          CREATE OR REPLACE FUNCTION log_timetable_changes() 
          RETURNS TRIGGER AS $$
          BEGIN
              IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
                  INSERT INTO timetable_log (
                      timetable_id, 
                      subject_id, 
                      timetable_day, 
                      timetable_bool, 
                      start_time, 
                      end_time, 
                      operation,
                      created_by, 
                      created_at
                  )
                  VALUES (
                      NEW.timetable_id, 
                      NEW.subject_id, 
                      NEW.timetable_day, 
                      NEW.timetable_bool, 
                      NEW.start_time, 
                      NEW.end_time, 
                      TG_OP,  -- INSERT/UPDATE művelet
                      COALESCE(current_setting('myapp.current_user', true)::integer, 0),
                      NOW()
                  );
                  RETURN NEW;
              END IF;
              RETURN NULL;
          END;
          $$ LANGUAGE plpgsql;

          CREATE TRIGGER timetable_changes_trigger
          AFTER INSERT OR UPDATE ON "timetable"
          FOR EACH ROW
          EXECUTE FUNCTION log_timetable_changes();
      `))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
      .dropTableIfExists("user_role")
      .dropTableIfExists("role_permission")
      .dropTableIfExists("user_subject_log")
      .dropTableIfExists("subject_log")
      .dropTableIfExists("timetable_log")
      .dropTableIfExists("user_log")
      .dropTableIfExists("user_subject")
      .dropTableIfExists("permission")
      .dropTableIfExists("timetable")
      .dropTableIfExists("role")
      .dropTableIfExists("user")
      .dropTableIfExists("subject");
};
