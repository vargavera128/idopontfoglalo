const {
    getUserRoles,
    getUserRoleById,
    updateUserRoleById,
    deleteUserRoleById,
    addUserRole,
  } = require("../controllers/user_role.js");
  
  const UserRole = {  //Struct for UserRole
    type: "object",
    properties: {
      user_role_id: { type: "integer" },
      user_id: { type: "integer" },
      role_id: { type: "integer" },
      created_at: { type: "string" },
    },
  };
  
  const getUserRolesOpts = {    //Option for get all user_role entries
    description: "Gets all user-role relationships",
    schema: {
      response: {
        200: {
          type: "array",
          items: UserRole,
        },
      },
    },
    handler: getUserRoles,
  };
  
  const getUserRoleOpts = {  //Option for get user_role by id
    schema: {
      description: "Gets user-role relationship by id",
      response: {
        200: {
          type: "array",
          items: UserRole,
        },
      },
    },
    handler: getUserRoleById,
  };
  
  const updateUserRoleOpts = {  //Option for update user_role by id
    schema: {
      description: "Updates user-role relationship by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: updateUserRoleById,
  };
  
  const postUserRoleOpts = {  //Option for add new user_role entry
    schema: {
      description: "Adds new user-role relationship",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: addUserRole,
  };
  
  const deleteUserRoleOpts = {  //Option for delete user_role by id
    schema: {
      description: "Deletes user-role relationship by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: deleteUserRoleById,
  };
  
  function userRoleRoutes(fastify, options, done) {
    fastify.get("/user_role", getUserRolesOpts);
    fastify.get("/user_role/:user_role_id", getUserRoleOpts);
    fastify.put("/user_role/:user_role_id", updateUserRoleOpts);
    fastify.post("/user_role", postUserRoleOpts);
    fastify.delete("/user_role/:user_role_id", deleteUserRoleOpts);
    done();
  }
  
  module.exports = userRoleRoutes;
  