/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("user").del();
    await knex("timetable").insert([  //create dev user
      {
        username: "tanar",
        name: "teszt tanar",
        password: "tanar",
        email: "tanar@email.com",
        created_at: new Date(),
      },
    ]);

    await knex("user").insert([  //create dev user
      {
        username: "tanar",
        name: "teszt tanar",
        password: "tanar",
        email: "tanar@email.com",
        created_at: new Date(),
      },
    ]);
  };
  
  