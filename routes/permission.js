const {
    getPermission,
    getPermissionById,
    addPermission,
    updatePermissionById,
    deletePermissionById,
  } = require("../controllers/permission");
  const { fastify } = require("../index.js");
  
  const Item = {  // Struct for Item
    type: "object",
    properties: {
      permission_id: { type: "integer" },
      permission_name: { type: "string" },
      permission_desc: { type: "string" },
      created_at: { type: "string", format: "date-time" },  // Ezt így kell deklarálni
    },
  };
  
  const getItemsOpts = {  // Options for get all items
    schema: {
      description: "Get all permission",
      response: {
        200: {
          type: "array",
          items: Item,
        },
      },
    },
    handler: getPermission,
    // onRequest: [fastify.authenticate]
  };
  
  const getItemOpts = {  // Options for get one item by id
    schema: {
      description: "Get permission by id",
      response: {
        200: Item,
      },
    },
    handler: getPermissionById,
    // onRequest: [fastify.authenticate]
  };

  
  const postItemOpts = {  // Options for adding a new item
    schema: {
      description: "Add a new permission",
      body: {
        type: "object",
        properties: {
          permission_name: { type: "string" },
          permission_desc: { type: "string" },
        },
        required: ['permission_name', 'permission_desc'],
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        409: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: addPermission,
    // onRequest: [fastify.authenticate]
  };
  const updateItemOpts = {  //Update one Item
    schema: {
      description: "Update permission by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: updatePermissionById,
    //onRequest: [fastify.authenticate]
  };
  const deleteItemOpts = {  // Options for deleting an item
    schema: {
      description: "Delete permission by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: deletePermissionById,
    // onRequest: [fastify.authenticate]
  };
  
  function UserRoutes(fastify, options, done) {
    fastify.get("/permission", getItemsOpts);  // Get all permission
    fastify.get("/permission/:permission_id", getItemOpts);  // Get permission by id
    fastify.post("/permission", postItemOpts);  // Add a new permission
    fastify.put("/permission/:permission_id", updateItemOpts);  //put -> update
    fastify.delete("/permission/:permission_id", deleteItemOpts);  // Delete a permission by id
    done();
  }
  
  module.exports = UserRoutes;
  