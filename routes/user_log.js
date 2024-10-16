
const {
    getUserLog,
    getUserLogById,
    getUserLogByUserId
  } = require("../controllers/user_log.js");
  const { fastify } = require("../index.js");
  
  
  const Item = {  // Struct for Item
    type: "object",
    properties: {
      user_id: { type: "number" },
      username: {type: "string"},
      name: {type: "string"},
      password: {type: "string"},
      email: {type: "string"},
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
    onRequest: [fastify.authenticate],
    handler: getUserLog,
  };
  
  const getItemOpts = {  // Options for get  user log by user log id
    schema: {
      description: "Gets user log by user log id",
      response: {
        200: Item,
      },
    },
    onRequest: [fastify.authenticate],
    handler: getUserLogById,
  };

  const getItemOptsUserid = {  // Options for get user log by user id
    schema: {
      description: "Gets user log by user id",
      response: {
        200: Item,
      },
    },
    onRequest: [fastify.authenticate],
    handler: getUserLogByUserId,
  };
  
  
  
  function UserLogRoutes(fastify, options, done) {
    fastify.get("/user_log", getItemsOpts);
    fastify.get("/user_log/:user_log_id", getItemOpts);
    fastify.get("/user_log_user_id/:user_id", getItemOptsUserid);
    done();
  }
  module.exports = UserLogRoutes;
  