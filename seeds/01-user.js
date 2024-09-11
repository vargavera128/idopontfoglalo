/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("user").del();
    await knex("user").insert([  //create dev user
      {
        uuid: "aa87270e-3eff-40c3-ab5b-9b3d940a3806",
        email: "dev",
        name: "dev",
        password: "5fd7087e3ba5e067d8c154a716949ebb7a158a5ecceaec1674432d7f36fb9fa9699dadfa571ac87ed752c6c9297a4f50f03e16c2925a5411b98ee4a29bdacced",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  };
  
  