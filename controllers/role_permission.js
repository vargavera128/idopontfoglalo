const { knex } = require("../database");

const getRolePermissions = async (req, reply) => {  //get all role_permission entries
  try {
    const rolePermissions = await knex("role_permission").select("*");
    reply.send(rolePermissions);
  } catch (error) {
    reply.send(error);
  }
};

const getRolePermissionById = async (req, reply) => {  //get role_permission by id
  const { role_permission_id } = req.params;
  try {
    const rolePermission = await knex("role_permission").select("*").where({ role_permission_id });
    reply.send(rolePermission);
  } catch (error) {
    reply.code(500).send({ message: "Internal server error" });
  }
};

const updateRolePermissionById = async (req, reply) => {  //update role_permission by id
  const { role_permission_id } = req.params;
  const { role_id } = req.body;
  const { permission_id } = req.body;
  try {
    const rolePermission = await knex("role_permission").where({ role_permission_id }).update({
      role_id: role_id,
      permission_id: permission_id,
      created_at: new Date(),
    });
    reply.send(rolePermission);
  } catch (error) {
    reply.send(error);
  }
};

const deleteRolePermissionById = async (req, reply) => {  //delete role_permission by id
  const { role_permission_id } = req.params;
  try {
    await knex("role_permission").where({ role_permission_id }).del();
    reply.send({ message: `Role-permission relationship ${role_permission_id} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};

const addRolePermission = async (req, reply) => {  //add new role_permission entry
  const { role_id } = req.body;
  const { permission_id } = req.body;

  try {
    await knex("role_permission").insert({
      role_id: role_id,
      permission_id: permission_id,
      created_at: new Date(),
    });
    reply.send({ message: `Role-permission relationship has been added` });
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getRolePermissions,
  getRolePermissionById,
  updateRolePermissionById,
  deleteRolePermissionById,
  addRolePermission,
};
