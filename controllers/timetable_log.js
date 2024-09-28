const { knex } = require("../index.js");

const getTimetableLog = async (req, reply) => {  //get all timetable logs
  try {
    const user = await knex("timetable_log").select("*");
    reply.send(user);
  } catch (error) {
    reply.send(error);
  }
};

const getTimetableLogById = async (req, reply) => {  //get timetable log by timetable log id
  const { timetable_log_id } = req.params;
  try {
    const timetable = await knex("timetable_log").select("*").where({ timetable_log_id: timetable_log_id });
    reply.send(timetable[0]);
  } catch (error) {
    reply.send(error);
  }
};

const getTimetableLogByTimetableId = async (req, reply) => {  //get timetable log by timetable id
    const { timetable_id } = req.params;
    try {
      const timetable = await knex("timetable_log").select("*").where({ timetable_id: timetable_id });
      reply.send(timetable[0]);
    } catch (error) {
      reply.send(error);
    }
  };

module.exports = {
    getTimetableLog,
    getTimetableLogById,
    getTimetableLogByTimetableId,
  };