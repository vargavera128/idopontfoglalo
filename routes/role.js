const {
    getRole,
    getRolesById,
    getRolesByName,
    addNewRole,
    deleteRoleById,
    updateRoleById,
  } = require("../controllers/role.js");
  const {fastify} = require("../index.js");
  
  const Role = {   // Struct for Role
    type: "object",
    properties: {
      role_name: { type: "string" },
      role_desc: { type: "string" },
      created_at: { type: "string", format: "date-time" },
    },
  };
  
  const getRolesOpts = {   // Options for get all roles
    schema: {
      description: "Get all times",
      response: {
        200: { type: "array", items: Role },
      },
    },
    handler: getRole,
    onRequest: [fastify.authenticate]
  };
  
  const getRoleOpts2 = { // Options for get one role
    schema: {
      description: "Get time by id",
      response: {
        200: Role,
      },
    },
    handler: getRolesById,
    onRequest: [fastify.authenticate]
  };

  const getRoleOpts = { // Options for get one role
    schema: {
      description: "Get time by name of the role",
      response: {
        200: Role,
      },
    },
    handler: getRolesByName,
    onRequest: [fastify.authenticate]
  };
  
  const postRoleOpts = { //Options for add role
    schema: {
      description: "Add a new time",
      body: {
        type: "object",
        properties: {
          role_name: { type: "string" },
          role_desc: { type: "string" },

        },
        required: ['role_name', 'role_desc'],
      },
      response: {
        200: {
          type: "object",
          properties: { message: { type: "string" } },
        },
        409: {
          type: "object",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: addNewRole,
    onRequest: [fastify.authenticate]
  };
  
  const deleteRoleOpts = { //Options for Delete role
    schema: {
      description: "Delete time by id",
      response: {
        200: {
          type: "object",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: deleteRoleById,
    onRequest: [fastify.authenticate]
  };
  
  const updateRoleOpts = { // Update one Role
    schema: {
      description: "Update time by id",
      response: {
        200: {
          type: "object",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: updateRoleById,
    onRequest: [fastify.authenticate]
  };
  
  function RoleRoutes(fastify, options, done) {
    fastify.get("/role", getRolesOpts);
    fastify.get("/role/:role_id", getRoleOpts2);
    fastify.get("/role1/:role_name", getRoleOpts);
    fastify.post("/role", postRoleOpts);
    fastify.delete("/role/:role_id", deleteRoleOpts);
    fastify.put("/role/:role_id", updateRoleOpts);
    // fastify.get("/checkAuth",checkAuthOpts)
    done();
  }
  
  module.exports = RoleRoutes;
  