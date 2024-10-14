const { knex } = require("../index.js");
//const { pbkdf2 } = require("crypto");
//const  {fastify}  = require("../index.js");

const getTimes = async (req, reply) => {  //get all times
  try {
    const timetable = await knex("timetable").select("*");
    reply.send(timetable);
  } catch (error) {
    reply.send(error);
  }
};

const getTimesById = async (req, reply) => {  //get times by id
    const { timetable_id } = req.params;
    try {
      const timetable = await knex("timetable").select("*").where({ timetable_id: timetable_id });
      reply.send(timetable[0]);
    } catch (error) {
      reply.send(error);
    }
  };

  const getTimesBySubjectId = async (req, reply) => {  //get times by the id of subject
    const { subject_id } = req.params;
    try {
      const timetable = await knex("timetable").select("*").where({ subject_id: subject_id });
      reply.send(timetable[0]);
    } catch (error) {
      reply.send(error);
    }
  };

  

  /* const getTimesByBool = async (req, reply) => {  //get times by bool
    const { timetable_bool } = req.params;
    try {
      const timetable = await knex("timetable").select("*").where({ timetable_bool: timetable_bool });
      reply.send(timetable[0]);
    } catch (error) {
      reply.send(error);
    }
  }; */

  const addNewTime = async (req, reply) => {  //add new time
    const { subject_id } = req.body;
    const { timetable_day } = req.params;
    const { timetable_bool } = req.body;
    const { start_time } = req.body;
    const { end_time } = req.body;
    
    try {
      await knex("timetable").insert({      
        subject_id: subject_id,
        timetable_day: timetable_day,
        timetable_bool: timetable_bool,
        start_time: start_time,
        end_time: end_time,
        created_at: knex.fn.now(),    
      });
  
      reply.code(200).send({ message: `Time has been added` });
    } catch (error) {
      if(error.message.includes("duplicate key value violates unique constraint")){
        console.log("DUPLICATE")
        reply.code(409).send({ message: `Time already exists` });
      }
      console.log(error)
    }
  };

  const deleteTimeById = async (req, reply) => {  //delete time by id
    const { timetable_id } = req.params;
    try {
      await knex("timetable").where({ timetable_id: timetable_id }).del();
      reply.send({ message: `Time ${timetable_id} has been removed` });
    } catch (error) {
      reply.send(error);
    }
  };

  const deleteTimeBySubjectId = async (req, reply) => {  //delete time by subject_id
    const { subject_id } = req.params;
    try {
      await knex("timetable").where({ subject_id: subject_id }).del();
      reply.send({ message: `Time ${subject_id} has been removed` });
    } catch (error) {
      reply.send(error);
    }
  };

  /* const deleteTimeByBool = async (req, reply) => {  //delete time by bool
    const { timetable_bool } = req.params;
    try {
      await knex("timetable").where({ timetable_bool: timetable_bool }).del();
      reply.send({ message: `Time ${timetable_bool} has been removed` });
    } catch (error) {
      reply.send(error);
    }
  }; */

  const deleteTimeByDay = async (req, reply) => {  //delete time by day
    const { timetable_day } = req.params;
    try {
      await knex("timetable").where({ timetable_day: timetable_day }).del();
      reply.send({ message: `Time ${timetable_day} has been removed` });
    } catch (error) {
      reply.send(error);
    }
  };

  const updateTimeById = async (req, reply) => {  //update time by id
    const { timetable_id } = req.params;
    const { subject_id } = req.params;
    const { timetable_day } = req.body;
    const { timetable_bool } = req.body;
    const { start_time } = req.body;
    const { end_time } = req.body;
    
    const timetable = await knex("timetable").where({ timetable_id: timetable_id });
    
      try {
        userUpdate = await knex("timetable")
          .where({ timetable_id: timetable_id })
          .update({
            //timetable_id: timetable[0].timetable_id,
            timetable_bool: timetable_bool,
            start_time: start_time,
            end_time: end_time,
          });
        reply.code(200).send({ message: `Successfull edit` });
      } catch (error) {
        reply.send(error);
      }
  };

  const getFreeTimes = async (request, reply) => {
    const { timetable_id } = request.params;
    try {
      const timetableInfo = await knex('timetable')
        .select('subject.subject_name', 'timetable.timetable_day', 'timetable.start_time', 'timetable.end_time')
        .leftJoin('subject', 'timetable.subject_id', 'subject.subject_id')
        .where('timetable.timetable_bool', false);  // Csak a szabad időpontok

      
      reply.send(timetableInfo);
    } catch (error) {
      reply.send(error);
    }
  };

  const getSubjectByDay = async (request, reply) => {
    const { timetable_day } = request.params;
    try {
      const timetableInfo2 = await knex('timetable')
        .select('subject.subject_name')
        .leftJoin('subject', 'timetable.subject_id', 'subject.subject_id')
        .where('timetable.timetable_day',timetable_day);  

      
      reply.send(timetableInfo2);
    } catch (error) {
      reply.send(error);
    }
  };
  
  
  module.exports = {
    getTimes,
    getTimesById,
    getTimesBySubjectId,
    addNewTime,
    deleteTimeById,
    deleteTimeBySubjectId,
    deleteTimeByDay,
    updateTimeById,
    getFreeTimes,
    getSubjectByDay,
  };
  