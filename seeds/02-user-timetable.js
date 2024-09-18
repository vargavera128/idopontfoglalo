/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("user").del();
    await knex("user").insert([  //create dev user
      {
        username: "tanar",
        name: "teszt tanar",
        password: "tanar",
        email: "tanar@email.com",
        created_at: new Date(),
      },
    ]);
    
    await knex("timetable").del();
    await knex("timetable").insert([  //create dev user
      {
        subject_id: "03",
        timetable_day: "Hétfő",
        timetable_bool: false,
        timetable_time: "8:00-9:00",
        created_at: new Date(),
      },
    ]);

    await knex("timetable").insert([  //create dev user
        {
          subject_id: "06",
          timetable_day: "Hétfő",
          timetable_bool: false,
          timetable_time: "9:00-10:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "09",
          timetable_day: "Hétfő",
          timetable_bool: false,
          timetable_time: "10:00-11:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "01",
          timetable_day: "Hétfő",
          timetable_bool: false,
          timetable_time: "13:00-14:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "02",
          timetable_day: "Hétfő",
          timetable_bool: false,
          timetable_time: "14:00-15:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "11",
          timetable_day: "Hétfő",
          timetable_bool: false,
          timetable_time: "15:00-16:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "10",
          timetable_day: "Kedd",
          timetable_bool: false,
          timetable_time: "13:00-14:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "08",
          timetable_day: "Kedd",
          timetable_bool: false,
          timetable_time: "14:00-15:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "09",
          timetable_day: "Kedd",
          timetable_bool: false,
          timetable_time: "15:00-16:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "12",
          timetable_day: "Kedd",
          timetable_bool: false,
          timetable_time: "16:00-17:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "12",
          timetable_day: "Kedd",
          timetable_bool: false,
          timetable_time: "17:00-18:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "07",
          timetable_day: "Kedd",
          timetable_bool: false,
          timetable_time: "18:00-19:00",
          created_at: new Date(),
        },
      ]);

      await knex("timetable").insert([  //create dev user
        {
          subject_id: "03",
          timetable_day: "Szerda",
          timetable_bool: false,
          timetable_time: "8:00-9:00",
          created_at: new Date(),
        },
      ]);
  
      await knex("timetable").insert([  //create dev user
          {
            subject_id: "06",
            timetable_day: "Szerda",
            timetable_bool: false,
            timetable_time: "9:00-10:00",
            created_at: new Date(),
          },
        ]);
  
        await knex("timetable").insert([  //create dev user
          {
            subject_id: "09",
            timetable_day: "Szerda",
            timetable_bool: false,
            timetable_time: "10:00-11:00",
            created_at: new Date(),
          },
        ]);
  
        await knex("timetable").insert([  //create dev user
          {
            subject_id: "01",
            timetable_day: "Szerda",
            timetable_bool: false,
            timetable_time: "13:00-14:00",
            created_at: new Date(),
          },
        ]);
  
        await knex("timetable").insert([  //create dev user
          {
            subject_id: "02",
            timetable_day: "Szerda",
            timetable_bool: false,
            timetable_time: "14:00-15:00",
            created_at: new Date(),
          },
        ]);
  
        await knex("timetable").insert([  //create dev user
          {
            subject_id: "11",
            timetable_day: "Szerda",
            timetable_bool: false,
            timetable_time: "15:00-16:00",
            created_at: new Date(),
          },
        ]);

        await knex("timetable").insert([  //create dev user
          {
            subject_id: "11",
            timetable_day: "Csütörtök",
            timetable_bool: false,
            timetable_time: "13:00-14:00",
            created_at: new Date(),
          },
        ]);
  
        await knex("timetable").insert([  //create dev user
          {
            subject_id: "01",
            timetable_day: "Csütörtök",
            timetable_bool: false,
            timetable_time: "14:00-15:00",
            created_at: new Date(),
          },
        ]);
  
        await knex("timetable").insert([  //create dev user
          {
            subject_id: "04",
            timetable_day: "Csütörtök",
            timetable_bool: false,
            timetable_time: "15:00-16:00",
            created_at: new Date(),
          },
        ]);
  
        await knex("timetable").insert([  //create dev user
          {
            subject_id: "05",
            timetable_day: "Csütörtök",
            timetable_bool: false,
            timetable_time: "16:00-17:00",
            created_at: new Date(),
          },
        ]);
  
        await knex("timetable").insert([  //create dev user
          {
            subject_id: "10",
            timetable_day: "Csütörtök",
            timetable_bool: false,
            timetable_time: "17:00-18:00",
            created_at: new Date(),
          },
        ]);
  
        await knex("timetable").insert([  //create dev user
          {
            subject_id: "07",
            timetable_day: "Csütörtök",
            timetable_bool: false,
            timetable_time: "18:00-19:00",
            created_at: new Date(),
          },
        ]);

        await knex("timetable").insert([  //create dev user
          {
            subject_id: "03",
            timetable_day: "Péntek",
            timetable_bool: false,
            timetable_time: "8:00-9:00",
            created_at: new Date(),
          },
        ]);
    
        await knex("timetable").insert([  //create dev user
            {
              subject_id: "03",
              timetable_day: "Péntek",
              timetable_bool: false,
              timetable_time: "9:00-10:00",
              created_at: new Date(),
            },
          ]);
    
          await knex("timetable").insert([  //create dev user
            {
              subject_id: "09",
              timetable_day: "Péntek",
              timetable_bool: false,
              timetable_time: "10:00-11:00",
              created_at: new Date(),
            },
          ]);
    
          await knex("timetable").insert([  //create dev user
            {
              subject_id: "06",
              timetable_day: "Péntek",
              timetable_bool: false,
              timetable_time: "13:00-14:00",
              created_at: new Date(),
            },
          ]);
    
          await knex("timetable").insert([  //create dev user
            {
              subject_id: "06",
              timetable_day: "Péntek",
              timetable_bool: false,
              timetable_time: "14:00-15:00",
              created_at: new Date(),
            },
          ]);
    
          await knex("timetable").insert([  //create dev user
            {
              subject_id: "11",
              timetable_day: "Péntek",
              timetable_bool: false,
              timetable_time: "15:00-16:00",
              created_at: new Date(),
            },
          ]);

  };

  