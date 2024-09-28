const { knex } = require("../index.js");
//const { pbkdf2 } = require("crypto");
//const  {fastify}  = require("../index.js");

const getRole = async (req, reply) => {  //get all times
  try {
    const role = await knex("role").select("*");
    reply.send(role);
  } catch (error) {
    reply.send(error);
  }
};

const getRolesById = async (req, reply) => {  //get roles by id
    const { role_id } = req.params;
    try {
      const role = await knex("role").select("*").where({ role_id: role_id });
      reply.send(role[0]);
    } catch (error) {
      reply.send(error);
    }
  };

  const getRolesByName = async (req, reply) => {  //get roles by name
    const { role_name } = req.params;
    try {
      const role = await knex("role").select("*").where({ role_name : role_name });
      reply.send(role[0]);
    } catch (error) {
      reply.send(error);
    }
  };


  const addNewRole = async (req, reply) => {  //add new role
    const { role_name } = req.body;
    const { role_desc } = req.body;
    
    try {
      await knex("role").insert({      
        role_name : role_name,
        role_desc: role_desc,
        created_at: knex.fn.now(),    
      });
  
      reply.code(200).send({ message: `Role has been added` });
    } catch (error) {
      if(error.message.includes("duplicate key value violates unique constraint")){
        console.log("DUPLICATE")
        reply.code(409).send({ message: `Role already exists` });
      }
      console.log(error)
    }
  };

  const deleteRoleById = async (req, reply) => {  //delete role by id
    const { role_id } = req.params;
    try {
      await knex("role").where({ role_id: role_id }).del();
      reply.send({ message: `Role ${role_id} has been removed` });
    } catch (error) {
      reply.send(error);
    }
  };

  const updateRoleById = async (req, reply) => {  //update role by id
    const { role_id } = req.params;
    const { role_name} = req.body;
    const { role_desc } = req.body;
    
    const role = await knex("role").where({ role_id: role_id });
    
      try {
        userUpdate = await knex("role")
          .where({ role_id: role_id })
          .update({
            role_name: role_name,
            role_desc: role_desc,
          });
        reply.code(200).send({ message: `Successfull edit` });
      } catch (error) {
        reply.send(error);
      }
  };

  const checkAuth = async (request, reply) => {  //checkAuth
    reply.send(request.role);
  };

  module.exports = {
    getRole,
    getRolesById,
    getRolesByName,
    addNewRole,
    deleteRoleById,
    updateRoleById,
    checkAuth,
  };