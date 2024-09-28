const { knex } = require("../database");

const getUserSubjects = async (req, reply) => {  //get all user_subject entries
  try {
    const userSubjects = await knex("user_subject").select("*");
    reply.send(userSubjects);
  } catch (error) {
    reply.send(error);
  }
};

const getUserSubjectById = async (req, reply) => {  //get user_subject by id
  const { user_subject_id } = req.params;
  try {
    const userSubject = await knex("user_subject").select("*").where({ user_subject_id: user_subject_id });
    reply.send(userSubject);
  } catch (error) {
    reply.code(500).send({ message: "Internal server error" });
  }
};

const updateUserSubjectById = async (req, reply) => {  //update user_subject by id
  const { user_subject_id } = req.params;
  const { user_id } = req.body;
  const { subject_id } = req.body;
  try {
    const userSubject = await knex("user_subject").where({ user_subject_id: user_subject_id }).update({
      user_id: user_id,
      subject_id: subject_id,
      created_at: new Date(),
    });
    reply.code(200).send({ message: `Successfull edit` });
  } catch (error) {
    reply.send(error);
  }
};

const deleteUserSubjectById = async (req, reply) => {  //delete user_subject by id
  const { user_subject_id } = req.params;
  try {
    await knex("user_subject").where({ user_subject_id: user_subject_id }).del();
    reply.send({ message: `User-subject relationship ${user_subject_id} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};

const addUserSubject = async (req, reply) => {  //add new user_subject entry
  const { user_id } = req.body;
  const { subject_id } = req.body;

  try {
    await knex("user_subject").insert({
      user_id: user_id,
      subject_id: subject_id,
      created_at: new Date(),
    });
    reply.send({ message: `User-subject relationship has been added` });
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getUserSubjects,
  getUserSubjectById,
  updateUserSubjectById,
  deleteUserSubjectById,
  addUserSubject,
};
