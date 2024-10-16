const {
    getSubject,
    getSubjectById,
    getSubjectLevel,
    addSubject,
    deleteSubjectById,
    updateSubjectById
  } = require("../controllers/subject");
  const { fastify } = require("../index.js");
  
  const Item = {  // Struct for Item
    type: "object",
    properties: {
      subject_id: { type: "integer" },
      subject_name: { type: "string" },
      subject_level: { type: "string" },
      subject_lang: { type: "string" },
      subject_desc: { type: "string" },
      subject_type: { type: "string" },
      subject_price: { type: "integer" },
      created_at: { type: "string", format: "date-time" },  // Ezt így kell deklarálni
    },
  };
  
  const getItemsOpts = {  // Options for get all items
    schema: {
      description: "Get all subjects",
      response: {
        200: {
          type: "array",
          items: Item,
        },
      },
    },
    handler: getSubject,
    onRequest: [fastify.authenticate]
  };
  
  const getItemOpts = {  // Options for get one item by id
    schema: {
      description: "Get subject by id",
      response: {
        200: Item,
      },
    },
    handler: getSubjectById,
    onRequest: [fastify.authenticate]
  };
  
  const getItemOpts2 = {  // Options for get one item by level
    schema: {
      description: "Get subject by level",
      response: {
        200: {
          type: "array",
          items: Item,
        },
      },
    },
    handler: getSubjectLevel,
    onRequest: [fastify.authenticate]
  };
  
  const postItemOpts = {  // Options for adding a new item
    schema: {
      description: "Add a new subject",
      body: {
        type: "object",
        properties: {
          subject_name: { type: "string" },
          subject_level: { type: "string" },
          subject_lang: { type: "string" },
          subject_desc: { type: "string" },
          subject_type: { type: "string" },
          subject_price: { type: "integer" },
        },
        required: ['subject_name', 'subject_level', 'subject_lang', 'subject_desc', 'subject_type', 'subject_price'],
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
    handler: addSubject,
    onRequest: [fastify.authenticate]
  };
  const updateItemOpts = {  //Update one Item
    schema: {
      description: "Update subject by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: updateSubjectById,
    onRequest: [fastify.authenticate]
  };
  const deleteItemOpts = {  // Options for deleting an item
    schema: {
      description: "Delete subject by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: deleteSubjectById,
    onRequest: [fastify.authenticate]
  };
  
  function UserRoutes(fastify, options, done) {
    fastify.get("/subject", getItemsOpts);  // Get all subjects
    fastify.get("/subject/:subject_id", getItemOpts);  // Get subject by id
    fastify.get("/subjectlevel/:subject_level", getItemOpts2);  // Get subject by level
    fastify.post("/subject", postItemOpts);  // Add a new subject
    fastify.put("/subject/:subject_id", updateItemOpts);  //put -> update
    fastify.delete("/subject/:subject_id", deleteItemOpts);  // Delete a subject by id
    done();
  }
  
  module.exports = UserRoutes;
  