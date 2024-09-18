/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("user").del();
    await knex("subject").insert([  //create dev user
      {
        subject_name: "matematika",
        subject_level: "általános iskola",
        subject_lang: "magyar",
        subject_desc: "Matematika óra általános iskolásoknak",
        subject_type: "online",
        subject_price:5000,
        created_at: new Date(),
      },
    ]);


    await knex("subject").insert([  //create dev user
        {
          subject_name: "matematika",
          subject_level: "középiskola",
          subject_lang: "magyar",
          subject_desc: "Matematika óra középiskolásoknak",
          subject_type: "online",
          subject_price:6000,
          created_at: new Date(),
        },
      ]);


      await knex("subject").insert([  //create dev user
        {
          subject_name: "matematika",
          subject_level: "egyetem",
          subject_lang: "magyar",
          subject_desc: "Matematika óra egyetemistáknak",
          subject_type: "online",
          subject_price:7000,
          created_at: new Date(),
        },
      ]);


      await knex("subject").insert([  //create dev user
        {
          subject_name: "fizika",
          subject_level: "általános iskola",
          subject_lang: "magyar",
          subject_desc: "Fizika óra általános iskolásoknak",
          subject_type: "online",
          subject_price:5000,
          created_at: new Date(),
        },
      ]);
  
  
      await knex("subject").insert([  //create dev user
          {
            subject_name: "fizika",
            subject_level: "középiskola",
            subject_lang: "magyar",
            subject_desc: "Fizika óra középiskolásoknak",
            subject_type: "online",
            subject_price:6000,
            created_at: new Date(),
          },
        ]);
  
  
        await knex("subject").insert([  //create dev user
          {
            subject_name: "matematika",
            subject_level: "egyetem",
            subject_lang: "magyar",
            subject_desc: "Fizika óra egyetemistáknak",
            subject_type: "online",
            subject_price:7000,
            created_at: new Date(),
          },
        ]);

        await knex("subject").insert([  //create dev user
            {
              subject_name: "informatika",
              subject_level: "általános iskola",
              subject_lang: "magyar",
              subject_desc: "Informatika óra általános iskolásoknak",
              subject_type: "online",
              subject_price:5000,
              created_at: new Date(),
            },
          ]);
      
      
          await knex("subject").insert([  //create dev user
              {
                subject_name: "informatika",
                subject_level: "középiskola",
                subject_lang: "magyar",
                subject_desc: "Informatika óra középiskolásoknak",
                subject_type: "online",
                subject_price:6000,
                created_at: new Date(),
              },
            ]);
      
      
            await knex("subject").insert([  //create dev user
              {
                subject_name: "informatika",
                subject_level: "egyetem",
                subject_lang: "magyar",
                subject_desc: "Informatika óra egyetemistáknak",
                subject_type: "online",
                subject_price:7000,
                created_at: new Date(),
              },
            ]);


            await knex("subject").insert([  //create dev user
                {
                  subject_name: "angol",
                  subject_level: "B1",
                  subject_lang: "angol",
                  subject_desc: "Angol nyelv alapfokú nyelvvizsga felkészítő",
                  subject_type: "online",
                  subject_price:10000,
                  created_at: new Date(),
                },
              ]);


              await knex("subject").insert([  //create dev user
                {
                  subject_name: "angol",
                  subject_level: "B2",
                  subject_lang: "angol",
                  subject_desc: "Angol nyelv középfokú nyelvvizsga felkészítő",
                  subject_type: "online",
                  subject_price:12000,
                  created_at: new Date(),
                },
              ]);


              await knex("subject").insert([  //create dev user
                {
                  subject_name: "angol",
                  subject_level: "C1",
                  subject_lang: "angol",
                  subject_desc: "Angol nyelv felsőfokú nyelvvizsga felkészítő",
                  subject_type: "online",
                  subject_price:14000,
                  created_at: new Date(),
                },
              ]);
  };
  
  