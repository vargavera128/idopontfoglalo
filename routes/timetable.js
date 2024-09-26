const {
    getTimes,
    getTimesById,
    getTimesBySubjectId,
    addNewTime,
    deleteTimeById,
    deleteTimeBySubjectId,
    deleteTimeByDay,
    updateTimeById,
    //checkAuth,
  } = require("../controllers/timetable.js");
  
  const Time = {   // Struct for Timetable
    type: "object",
    properties: {
      subject_id: { type: "integer" },
      timetable_day: { type: "string" },
      timetable_bool: { type: "boolean" },
      start_time: { type: "string", pattern: "^(?:[01]\\d|2[0-3]):[0-5]\\d$" },
      end_time: { type: "string", pattern: "^(?:[01]\\d|2[0-3]):[0-5]\\d$" },
      created_at: { type: "string", format: "date-time" },
    },
  };
  
  const getTimesOpts = {   // Options for get all times
    schema: {
      description: "Get all times",
      response: {
        200: { type: "array", items: Time },
      },
    },
    handler: getTimes,
  };
  
  const getTimeOpts2 = { // Options for get one time
    schema: {
      description: "Get time by id",
      response: {
        200: Time,
      },
    },
    handler: getTimesById,
  };

  const getTimeOpts = { // Options for get one time
    schema: {
      description: "Get time by id of the subject",
      response: {
        200: Time,
      },
    },
    handler: getTimesBySubjectId,
  };
  
  const postTimeOpts = { //Options for add time
    schema: {
      description: "Add a new time",
      body: {
        type: "object",
        properties: {
          subject_id: { type: "integer" },
          timetable_day: { type: "string" },
          timetable_bool: { type: "boolean" },
          start_time: { type: "string", pattern: "^(?:[01]\\d|2[0-3]):[0-5]\\d$" },  // Time pattern
          end_time: { type: "string", pattern: "^(?:[01]\\d|2[0-3]):[0-5]\\d$" },    // Time pattern
        },
        required: ['subject_id', 'timetable_day', 'timetable_bool', 'start_time', 'end_time'],
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
    handler: addNewTime,
  };
  
  const deleteTimeOpts = { //Options for Delete time
    schema: {
      description: "Delete time by id",
      response: {
        200: {
          type: "object",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: deleteTimeById,
  };

  const deleteTimeOptsTwo = { //Options for Delete time
    schema: {
      description: "Delete time by id of the subject",
      response: {
        200: {
          type: "object",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: deleteTimeBySubjectId,
  };

  const deleteTimeOptsThree = { //Options for Delete time
    schema: {
      description: "Delete time by day",
      response: {
        200: {
          type: "object",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: deleteTimeByDay,
  };
  
  const updateTimeOpts = { // Update one Time
    schema: {
      description: "Update time by id",
      response: {
        200: {
          type: "object",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: updateTimeById,
  };
  
  function TimeRoutes(fastify, options, done) {
    fastify.get("/timetable", getTimesOpts);
    fastify.get("/timetable/:timetable_id", getTimeOpts2);
    fastify.get("/timetable1/:subject_id", getTimeOpts);
    fastify.post("/timetable", postTimeOpts);
    fastify.delete("/timetable/:timetable_id", deleteTimeOpts);
    fastify.delete("/timetable2/:subject_id", deleteTimeOptsTwo);
    fastify.delete("/timetable3/:timetable_day", deleteTimeOptsThree);
    fastify.put("/timetable/:timetable_id", updateTimeOpts);
    // fastify.get("/checkAuth",checkAuthOpts)
    done();
  }
  
  module.exports = TimeRoutes;
  