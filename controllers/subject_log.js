const { knex } = require("../index.js");

const getSubjectLog = async (req, reply) => {  //get all subject logs
  try {
    const  subject = await knex("subject_log").select("*");
    reply.send( subject);
  } catch (error) {
    reply.send(error);
  }
};

const getSubjectLogById = async (req, reply) => {  //get subject log by subject log id
  const {  subject_log_id } = req.params;
  try {
    const  subject = await knex("subject_log").select("*").where({ subject_log_id: subject_log_id });
    reply.send( subject[0]);
  } catch (error) {
    reply.send(error);
  }
};

const getSubjectLogBySubjectId = async (req, reply) => {  //get subject log by subject id
    const {  subject_id } = req.params;
    try {
      const  subject = await knex("subject_log").select("*").where({ subject_id: subject_id });
      reply.send( subject[0]);
    } catch (error) {
      reply.send(error);
    }
  };

module.exports = {
    getSubjectLog,
    getSubjectLogById,
    getSubjectLogBySubjectId,
  };