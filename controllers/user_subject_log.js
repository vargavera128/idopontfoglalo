const { knex } = require("../index.js");

const getUserSubjectLog = async (req, reply) => {  //get all use subject logs
  try {
    const usersubject = await knex("user_subject_log").select("*");
    reply.send(usersubject);
  } catch (error) {
    reply.send(error);
  }
};

const getUserSubjectLogById = async (req, reply) => {  //get user subject log by user subject log id
  const { user_subject_log_id } = req.params;
  try {
    const usersubject = await knex("user_subject_log").select("*").where({ user_subject_log_id: user_subject_log_id });
    reply.send(usersubject[0]);
  } catch (error) {
    reply.send(error);
  }
};

const getUserSubjectLogByUserId = async (req, reply) => {  //get user subject log by user subject id
    const { user_subject_id } = req.params;
    try {
      const usersubject = await knex("user_subject_log").select("*").where({ user_subject_id: user_subject_id });
      reply.send(usersubject[0]);
    } catch (error) {
      reply.send(error);
    }
  };

module.exports = {
  getUserSubjectLog,
  getUserSubjectLogById,
  getUserSubjectLogByUserId,
  };