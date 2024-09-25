await knex("role_permission").del();

await knex("role_permission").insert([  // Role: Administrator (role_id: 1) - Full access
  { role_id: 1, permission_id: 1, created_at: new Date() },  // create user
  { role_id: 1, permission_id: 2, created_at: new Date() },  // create own user
  { role_id: 1, permission_id: 3, created_at: new Date() },  // edit user
  { role_id: 1, permission_id: 4, created_at: new Date() },  // edit own user
  { role_id: 1, permission_id: 5, created_at: new Date() },  // delete user
  { role_id: 1, permission_id: 6, created_at: new Date() },  // delete own user
  { role_id: 1, permission_id: 7, created_at: new Date() },  // get user data
  { role_id: 1, permission_id: 8, created_at: new Date() },  // get own user data
  { role_id: 1, permission_id: 9, created_at: new Date() },  // create subject
  { role_id: 1, permission_id: 10, created_at: new Date() }, // edit subject
  { role_id: 1, permission_id: 11, created_at: new Date() }, // get subject data
  { role_id: 1, permission_id: 12, created_at: new Date() }, // delete subject
  { role_id: 1, permission_id: 13, created_at: new Date() }, // create time
  { role_id: 1, permission_id: 14, created_at: new Date() }, // get time data
  { role_id: 1, permission_id: 15, created_at: new Date() }, // delete time
  { role_id: 1, permission_id: 16, created_at: new Date() }, // edit time
  { role_id: 1, permission_id: 17, created_at: new Date() }, // create role
  { role_id: 1, permission_id: 18, created_at: new Date() }, // delete role
  { role_id: 1, permission_id: 19, created_at: new Date() }, // edit role
  { role_id: 1, permission_id: 20, created_at: new Date() }, // get role data
  { role_id: 1, permission_id: 21, created_at: new Date() }, // create permission
  { role_id: 1, permission_id: 22, created_at: new Date() }, // delete permission
  { role_id: 1, permission_id: 23, created_at: new Date() }, // edit permission
  { role_id: 1, permission_id: 24, created_at: new Date() }, // get permission data
  { role_id: 1, permission_id: 25, created_at: new Date() }, // get log data
]);

await knex("role_permission").insert([  // Role: Author (role_id: 2) - Limited permissions
  { role_id: 2, permission_id: 2, created_at: new Date() },  // create own user
  { role_id: 2, permission_id: 4, created_at: new Date() },  // edit own user
  { role_id: 2, permission_id: 6, created_at: new Date() },  // delete own user
  { role_id: 2, permission_id: 8, created_at: new Date() },  // get own user data
  { role_id: 2, permission_id: 9, created_at: new Date() },  // create subject
  { role_id: 2, permission_id: 10, created_at: new Date() }, // edit subject
  { role_id: 2, permission_id: 11, created_at: new Date() }, // get subject data
  { role_id: 2, permission_id: 12, created_at: new Date() }, // delete subject
  { role_id: 2, permission_id: 13, created_at: new Date() }, // create time
  { role_id: 2, permission_id: 14, created_at: new Date() }, // get time data
  { role_id: 2, permission_id: 15, created_at: new Date() }, // delete time
  { role_id: 2, permission_id: 16, created_at: new Date() }, // edit time
  { role_id: 2, permission_id: 7, created_at: new Date() },  // get user data
  { role_id: 2, permission_id: 20, created_at: new Date() }, // get role data
  { role_id: 2, permission_id: 24, created_at: new Date() }, // get permission data
  { role_id: 2, permission_id: 25, created_at: new Date() }, // get log data
]);

await knex("role_permission").insert([  // Role: User (role_id: 3) - View-only and limited actions
  { role_id: 3, permission_id: 2, created_at: new Date() },  // create own user
  { role_id: 3, permission_id: 4, created_at: new Date() },  // edit own user
  { role_id: 3, permission_id: 6, created_at: new Date() },  // delete own user
  { role_id: 3, permission_id: 8, created_at: new Date() },  // get own user data
  { role_id: 3, permission_id: 7, created_at: new Date() },  // get user data
  { role_id: 3, permission_id: 11, created_at: new Date() }, // get subject data
  { role_id: 3, permission_id: 14, created_at: new Date() }, // get time data
]);
