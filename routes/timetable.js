const {
    getTimes,
    getTimesById,
    getTimesBySubjectId,
    addNewTime,
    deleteTimeById,
    deleteTimeBySubjectId,
    deleteTimeByDay,
    updateTimeById,
    getTimetableBooked,
    getTimetableByLevel,
    getTimetableBySubject,
    getFreeTimes,
    getSubjectByDay,
  } = require("../controllers/timetable.js");
  const {fastify} = require("../index.js");
  
  const Time = {   // Struct for Timetable
    type: "object",
    properties: {
      timetable_id:{ type: "integer" },
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
    onRequest: [fastify.authenticate]
  };
  
  const getTimeOpts2 = { // Options for get one time
    schema: {
      description: "Get time by id",
      response: {
        200: Time,
      },
    },
    handler: getTimesById,
    onRequest: [fastify.authenticate]
  };

  const getTimeOpts = { // Options for get one time
    schema: {
      description: "Get time by id of the subject",
      response: {
        200: { type: "array", items: Time },
      },
    },
    handler: getTimesBySubjectId,
    onRequest: [fastify.authenticate]
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
    onRequest: [fastify.authenticate]
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
    onRequest: [fastify.authenticate]
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
    onRequest: [fastify.authenticate]
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
    onRequest: [fastify.authenticate]
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
    onRequest: [fastify.authenticate]
  };

  const getTimetableBooked1 = { // get booked times
    schema: {
      description: "Get booked times",
      response: {
        200: {
          type: "array",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: getTimetableBooked,
    onRequest: [fastify.authenticate]
  };

  const getTimetableByLevel1 = { // get times by level of subject
    schema: {
      description: "Get booked times",
      response: {
        200: {
          type: "array",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: getTimetableByLevel,
    onRequest: [fastify.authenticate]
  };

  const getTimetableBySubject1 = { // get times by level of subject
    schema: {
      description: "Get times by subject",
      response: {
        200: {
          type: "array",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: getTimetableBySubject,
  };

  const getFreeTimes2 = { // get free times
    schema: {
      description: "Get free times",
      response: {
        200: {
          type: "array",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: getFreeTimes,
    onRequest: [fastify.authenticate]
  };

  const getSubjectByDay2 = { // get subject by day
    schema: {
      description: "Get subject by day",
      response: {
        200: {
          type: "array",
          properties: { message: { type: "string" } },
        },
      },
    },
    handler: getSubjectByDay,
    onRequest: [fastify.authenticate]
  };
  
  function TimeRoutes(fastify, options, done) {
    fastify.get("/timetable", getTimesOpts);
    fastify.get("/timetable/:timetable_id", getTimeOpts2);
    fastify.get("/timetable1/:subject_id", getTimeOpts);
    fastify.post("/timetable", postTimeOpts);
    fastify.delete("/timetable/:timetable_id", deleteTimeOpts);
    fastify.delete("/timetable2/:subject_id", deleteTimeOptsTwo);  //törli az összes pl 3-as id-jó tárgyhoz hoz tartozó órát
    fastify.delete("/timetable3/:timetable_day", deleteTimeOptsThree);  //törli az összes tárgyat az adott napon
    fastify.put("/timetable/:timetable_id", updateTimeOpts);
    fastify.get('/timetable/booked', getTimetableBooked1);
    fastify.get('/timetable4/:subject_level', getTimetableByLevel1);
    fastify.get('/timetables/free-times', getFreeTimes2),
    fastify.get('/timetables/:timetable_day', getSubjectByDay2);  //időpont, level is kell!!!
    fastify.get('/timetable5/:subject_name', getTimetableBySubject1);
    
    done();
  }
  
  module.exports = TimeRoutes;
  