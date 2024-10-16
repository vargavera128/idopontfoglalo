
const {
    getSubjectLog,
    getSubjectLogById,
    getSubjectLogBySubjectId
  } = require("../controllers/subject_log.js");
  const { fastify } = require("../index.js");
  
  
  const Item = {  // Struct for Item
    type: "object",
    properties: {
      subject_id: { type: "number" },
      subject_name: {type: "string"},
      subject_level: {type: "string"},
      subject_lang: {type: "string"},
      subject_desc: {type: "string"},
      subject_type: {type: "string"},
      subject_price: {type: "number"},
      created_by: { type: "number" },
      created_at: { type: "string" },
    },
  };
  
  
  const getItemsOpts = {  // Options for get all user logs
    schema: {
      description: "Gets all user logs",
      response: {
        200: {
          type: "array",
          items: Item,
        },
      },
    },
    //onRequest: [fastify.authenticate],
    handler: getSubjectLog,
    onRequest: [fastify.authenticate]
  };
  
  const getItemOpts = {  // Options for get  user log by user log id
    schema: {
      description: "Gets user log by user log id",
      response: {
        200: Item,
      },
    },
    //onRequest: [fastify.authenticate],
    handler: getSubjectLogById,
    onRequest: [fastify.authenticate]
  };

  const getItemOptsUserid = {  // Options for get user log by user id
    schema: {
      description: "Gets user log by user id",
      response: {
        200: Item,
      },
    },
    //onRequest: [fastify.authenticate],
    handler: getSubjectLogBySubjectId,
    onRequest: [fastify.authenticate]
  };
  
  
  
  function SubjectLogRoutes(fastify, options, done) {
    fastify.get("/subject_log", getItemsOpts);
    fastify.get("/subject_log/:subject_log_id", getItemOpts);
    fastify.get("/subject_log_subject_id/:subject_id", getItemOptsUserid);
    done();
  }
  module.exports = SubjectLogRoutes;
  