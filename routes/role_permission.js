const {
    getRolePermissions,
    getRolePermissionById,
    updateRolePermissionById,
    deleteRolePermissionById,
    addRolePermission,
  } = require("../controllers/role_permission.js");
  const {fastify} = require("../index.js");
  
  const RolePermission = {  //Struct for RolePermission
    type: "object",
    properties: {
      role_permission_id: { type: "integer" },
      role_id: { type: "integer" },
      permission_id: { type: "integer" },
      created_at: { type: "string" },
    },
  };
  
  const getRolePermissionsOpts = {    //Option for get all role_permission entries
    description: "Gets all role-permission relationships",
    schema: {
      response: {
        200: {
          type: "array",
          items: RolePermission,
        },
      },
    },
    handler: getRolePermissions,
    onRequest: [fastify.authenticate]
  };
  
  const getRolePermissionOpts = {  //Option for get role_permission by id
    schema: {
      description: "Gets role-permission relationship by role_permission_id",
      response: {
        200: {
          type: "array",
          items: RolePermission,
        },
      },
    },
    handler: getRolePermissionById,
    onRequest: [fastify.authenticate]
  };
  
  const updateRolePermissionOpts = {  //Option for update role_permission by id
    schema: {
      description: "Updates role-permission relationship by role_permission_id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: updateRolePermissionById,
    onRequest: [fastify.authenticate]
  };
  
  const postRolePermissionOpts = {  //Option for add new role_permission entry
    schema: {
      description: "Adds new role-permission relationship",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: addRolePermission,
    onRequest: [fastify.authenticate]
  };
  
  const deleteRolePermissionOpts = {  //Option for delete role_permission by id
    schema: {
      description: "Deletes role-permission relationship by role_permission_id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: deleteRolePermissionById,
    onRequest: [fastify.authenticate]
  };
  
  function rolePermissionRoutes(fastify, options, done) {
    fastify.get("/role_permission", getRolePermissionsOpts);
    fastify.get("/role_permission/:role_permission_id", getRolePermissionOpts);
    fastify.put("/role_permission/:role_permission_id", updateRolePermissionOpts);
    fastify.post("/role_permission", postRolePermissionOpts);
    fastify.delete("/role_permission/:role_permission_id", deleteRolePermissionOpts);
    done();
  }
  
  module.exports = rolePermissionRoutes;
  