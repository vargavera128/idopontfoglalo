
const {
    getTimetableLog,
    getTimetableLogById,
    getTimetableLogByTimetableId,
   
  } = require("../controllers/timetable_log.js");
  const { fastify } = require("../index.js");
  
  
  const Item = {  // Struct for Item
    type: "object",
    properties: {
      timetable_id: { type: "number" },
      subject_id: {type: "number"},
      timetable_day: {type: "string"},
      timetable_bool: {type: "boolean"},
      start_time: {type: "string"},
      end_time: {type: "string"},
      created_by: { type: "number" },
      created_at: { type: "string" },
    },
  };
  
  
  const getItemsOpts = {  // Options for get all timetable logs
    schema: {
      description: "Gets all timetable logs",
      response: {
        200: {
          type: "array",
          items: Item,
        },
      },
    },
    //onRequest: [fastify.authenticate],
    handler: getTimetableLog,
  };
  
  const getItemOpts = {  // Options for get timetable log by timetable log id
    schema: {
      description: "Gets timetable log by timetable log id",
      response: {
        200: Item,
      },
    },
    //onRequest: [fastify.authenticate],
    handler: getTimetableLogById,
  };

  const getItemOptsTimetableId = {  // Options for get timetable log by timetable id
    schema: {
      description: "Gets timetable log by timetable id",
      response: {
        200: Item,
      },
    },
    //onRequest: [fastify.authenticate],
    handler: getTimetableLogByTimetableId,
  };
  
  
  
  function TimetableLogRoutes(fastify, options, done) {
    fastify.get("/timetable_log", getItemsOpts);
    fastify.get("/timetable_log/:timetable_log_id", getItemOpts);
    fastify.get("/timetable_log_timetable_id/:timetable_id", getItemOptsTimetableId);

    done();
  }
  module.exports = TimetableLogRoutes;
  