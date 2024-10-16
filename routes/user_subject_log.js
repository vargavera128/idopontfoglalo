
const {
    getUserSubjectLog,
    getUserSubjectLogById,
    getUserSubjectLogByUserId,
  } = require("../controllers/user_subject_log.js");
  const { fastify } = require("../index.js");
  
  
  const Item = {  // Struct for Item
    type: "object",
    properties: {
      user_subject_id: { type: "number" },
      user_id: {type: "number"},
      subject_id: {type: "number"},
      created_by: { type: "number" },
      created_at: { type: "string" },
    },
  };
  
  
  const getItemsOpts = {  // Options for get all user subject logs
    schema: {
      description: "Gets all user subject logs",
      response: {
        200: {
          type: "array",
          items: Item,
        },
      },
    },
    onRequest: [fastify.authenticate],
    handler: getUserSubjectLog,
  };
  
  const getItemOpts = {  // Options for get user subject log by user subject log id
    schema: {
      description: "Gets user subject log by user subject log id",
      response: {
        200: Item,
      },
    },
    onRequest: [fastify.authenticate],
    handler: getUserSubjectLogById,
  };

  const getItemOptsTimetableId = {  // Options for get user subject log by user subject id
    schema: {
      description: "Gets user subject log by user subject id",
      response: {
        200: Item,
      },
    },
    onRequest: [fastify.authenticate],
    handler: getUserSubjectLogByUserId,
  };
  
  
  
  function TimetableLogRoutes(fastify, options, done) {
    fastify.get("/user_subject_log", getItemsOpts);
    fastify.get("/user_subject_log/:user_subject_log_id", getItemOpts);
    fastify.get("/user_subject_log_user_id/:user_subject_id", getItemOptsTimetableId);

    done();
  }
  module.exports = TimetableLogRoutes;
  