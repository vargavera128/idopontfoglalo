/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

    exports.seed = async function(knex) {
        await knex("role").del();
        await knex("role").insert([  //create roles
          {
            role_name: "administrator",
            role_desc: "Teljes hozzáféréssel rendelkezik a weboldalhoz. Kezeli a felhasználókat, beállításokat, tartalmat, jogosultságokat stb. Technikai és szervezeti felelőssége is van.",
            created_at: new Date(),
          },
        ]);
        
        await knex("role").insert([ 
            {
                role_name: "author",
                role_desc: "Tartalmak létrehozásáért, szerkesztéséért és közzétételéért felelős. Lehetősége van új tantárgyakat, időpontokat publikálni, de nem fér hozzá a weboldal technikai beállításaihoz.",
                created_at: new Date(),
              },
        ]);
    
        await knex("role").insert([ 
            {
                role_name: "user",
                role_desc: "Általános látogató, aki regisztrálhat vagy bejelentkezhet, hogy hozzáférjen személyes funkciókhoz (pl. időpontra jelentkezés). Nem rendelkezik adminisztratív vagy tartalmi hozzáféréssel.",
                created_at: new Date(),
              },
        ]);


        await knex("permission").insert([  //create permissions
          {
            permission_name: "create user",
            permission_desc: "Felhasználó létrehozása",
            created_at: new Date(),
          },
          {
            permission_name: "create own user",
            permission_desc: "Saját felhasználó létrehozása",
            created_at: new Date(),
          },
          {
            permission_name: "edit user",
            permission_desc: "Felhasználó adatainak szerkesztése",
            created_at: new Date(),
          },
          {
            permission_name: "edit own user",
            permission_desc: "Saját felhasználó adatainak szerkesztése",
            created_at: new Date(),
          },
          {
            permission_name: "delete user",
            permission_desc: "Felhasználó törlése",
            created_at: new Date(),
          },
          {
            permission_name: "delete own user",
            permission_desc: "Saját felhasználó törlése",
            created_at: new Date(),
          },
          {
            permission_name: "get user data",
            permission_desc: "Felhasználó adatainak lekérése",
            created_at: new Date(),
          },
          {
            permission_name: "get own user data",
            permission_desc: "Saját felhasználó adatainak lekérése",
            created_at: new Date(),
          },
          {
            permission_name: "create subject",
            permission_desc: "Tantárgy létrehozása",
            created_at: new Date(),
          },
          {
            permission_name: "edit subject",
            permission_desc: "Tantárgy szerkesztése",
            created_at: new Date(),
          },
          {
            permission_name: "get subject data",
            permission_desc: "Tantárgy adatainak lekérése",
            created_at: new Date(),
          },
          {
            permission_name: "delete subject",
            permission_desc: "Tantárgy törlése",
            created_at: new Date(),
          },
          {
            permission_name: "create time",
            permission_desc: "Időpont létrehozása",
            created_at: new Date(),
          },
          {
            permission_name: "update time",
            permission_desc: "Időpont frissítése",
            created_at: new Date(),
          },
          {
            permission_name: "delete time",
            permission_desc: "Időpont törlése",
            created_at: new Date(),
          },
          {
            permission_name: "edit time",
            permission_desc: "Időpont szerkesztése",
            created_at: new Date(),
          },
          {
            permission_name: "create role",
            permission_desc: "Szerepkör létrehozása",
            created_at: new Date(),
          },
          {
            permission_name: "delete role",
            permission_desc: "Szerepkör törlése",
            created_at: new Date(),
          },
          {
            permission_name: "edit role",
            permission_desc: "Szerepkör szerkesztése",
            created_at: new Date(),
          },
          {
            permission_name: "update role",
            permission_desc: "Szerepkör frissítése",
            created_at: new Date(),
          },
          {
            permission_name: "create permission",
            permission_desc: "Jogosultság létrehozása",
            created_at: new Date(),
          },
          {
            permission_name: "delete permission",
            permission_desc: "Jogosultság törlése",
            created_at: new Date(),
          },
          {
            permission_name: "update permission",
            permission_desc: "Jogosultság frissítése",
            created_at: new Date(),
          },
          {
            permission_name: "get permission data",
            permission_desc: "Jogosultság adatainak lekérése",
            created_at: new Date(),
          },
          {
            permission_name: "get log data",
            permission_desc: "Napló adatok lekérése (minden napló tábla)",
            created_at: new Date(),
          }
        ]);
    };
      