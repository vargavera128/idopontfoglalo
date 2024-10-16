const { fastify } = require("../app.js");
const { knex } = require("../database.js");
const { pbkdf2 } = require("crypto");

async function getAllUser(){
    try {
        const user = await knex("user").select("*");
        return user;
    } catch (error) {
        return {
            error: error,
            name: "GET ALL USER FAILED",
        };
      
    }
};

module.exports = {
    getAllUser,
  };