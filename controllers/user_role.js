const { knex } = require("../database");

const getUserRoles = async (req, reply) => {  //get all user_role entries
  try {
    const userRoles = await knex("user_role").select("*");
    reply.send(userRoles);
  } catch (error) {
    reply.send(error);
  }
};

const getUserRoleById = async (req, reply) => {  //get user_role by id
  const { user_role_id } = req.params;
  try {
    const userRole = await knex("user_role").select("*").where({ user_role_id: user_role_id });
    reply.send(userRole);
  } catch (error) {
    reply.code(500).send({ message: "Internal server error" });
  }
};

const updateUserRoleById = async (req, reply) => {  //update user_role by id
  const { user_role_id } = req.params;
  const { user_id } = req.body;
  const { role_id } = req.body;
  try {
    const userRole = await knex("user_role").where({ user_role_id: user_role_id }).update({
      user_id: user_id,
      role_id: role_id,
      created_at: new Date(),
    });
    reply.send(userRole);
  } catch (error) {
    reply.send(error);
  }
};

const deleteUserRoleById = async (req, reply) => {  //delete user_role by id
  const { user_role_id } = req.params;
  try {
    await knex("user_role").where({ user_role_id: user_role_id }).del();
    reply.send({ message: `User-role relationship ${user_role_id} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};

const addUserRole = async (req, reply) => {  //add new user_role entry
  const { user_id } = req.body;
  const { role_id } = req.body;

  try {
    await knex("user_role").insert({
      user_id: user_id,
      role_id: role_id,
      created_at: new Date(),
    });
    reply.send({ message: `User-role relationship has been added` });
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getUserRoles,
  getUserRoleById,
  updateUserRoleById,
  deleteUserRoleById,
  addUserRole,
};
