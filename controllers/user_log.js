const { knex } = require("../index.js");

const getUserLog = async (req, reply) => {  //get all user logs
  try {
    const user = await knex("user_log").select("*");
    reply.send(user);
  } catch (error) {
    reply.send(error);
  }
};

const getUserLogById = async (req, reply) => {  //get user log by user log id
  const { user_log_id } = req.params;
  try {
    const user = await knex("user_log").select("*").where({ user_log_id: user_log_id });
    reply.send(user[0]);
  } catch (error) {
    reply.send(error);
  }
};

const getUserLogByUserId = async (req, reply) => {  //get user log by user id
    const { user_id } = req.params;
    try {
      const user = await knex("user_log").select("*").where({ user_id: user_id });
      reply.send(user[0]);
    } catch (error) {
      reply.send(error);
    }
  };

module.exports = {
    getUserLog,
    getUserLogById,
    getUserLogByUserId,
  };