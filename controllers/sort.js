const { knex } = require("../index.js");

const getTrueTimetableBool = async (req, reply) => { 
  try {
    
  } catch (error) {
    reply.send(error);
  }
};

const getFalseTimetableBool = async (req, reply) => {  
  const { user_subject_log_id } = req.params;
  try {
    
  } catch (error) {
    reply.send(error);
  }
};

const getSpecificSubject = async (req, reply) => {  
    const {  } = req.params;
    try {
      
    } catch (error) {
      reply.send(error);
    }
  };

  const getSubjectByLevel = async (req, reply) => {  
    const {  } = req.params;
    try {
      
    } catch (error) {
      reply.send(error);
    }
  };

  const getSubjectByDay = async (req, reply) => {  
    const {  } = req.params;
    try {
      
    } catch (error) {
      reply.send(error);
    }
  };

  const getSubjectByHour = async (req, reply) => {  
    const {  } = req.params;
    try {
      
    } catch (error) {
      reply.send(error);
    }
  };

module.exports = {
    getTrueTimetableBool,
    getFalseTimetableBool,
    getSpecificSubject,
    getSubjectByLevel,
    getSubjectByDay,
    getSubjectByHour,
  };