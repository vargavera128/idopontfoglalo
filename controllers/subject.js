const { knex } = require("../index.js");
const { fastify } = require("../index.js");

const getSubject = async (req, reply) => {  //get all subjects
  try {
    const subject = await knex("subject").select("*");
    reply.send(subject);
  } catch (error) {
    reply.send(error);
  }
};

const getSubjectById = async (req, reply) => {  //get subject by id
  const { subject_id } = req.params;
  try {
    const subject = await knex("subject").select("*").where({ subject_id: subject_id });
    reply.send(subject[0]);
  } catch (error) {
    reply.send(error);
  }
};

const getSubjectLevel = async (req, reply) => {  //get subject by subject level
    const { subject_level } = req.params;
    try {
      const subjects = await knex("subject").select("*").where({ subject_level: subject_level });
      reply.send(subjects);  // Küldje vissza az összes találatot
    } catch (error) {
      reply.send(error);
    }
  };
  

const addSubject = async (req, reply) => {  //add new subject
    const { subject_name, subject_level, subject_lang, subject_desc, subject_type, subject_price } = req.body;
    const created_at = new Date();  // hozzáadjuk az aktuális időt
    try {
      const newSubject = await knex("subject")
        .insert({
          subject_name,
          subject_level,
          subject_lang,
          subject_desc,
          subject_type,
          subject_price,
          created_at,  // beállítjuk a létrehozás idejét
        })
        .returning('*');
      reply.code(201).send(newSubject);
    } catch (error) {
      reply.send(error);
    }
  };
  
  const updateSubjectById = async (req, reply) => {  //update subject by id
    const { subject_id } = req.params;
    const { subject_name } = req.body;
    const { subject_level } = req.body;
    const { subject_lang } = req.body;
    const { subject_desc } = req.body;
    const { subject_type } = req.body;
    const { subject_price } = req.body;
    const { pbkdf2 } = await import("crypto");
    const subject = await knex("subject").where({ subject_id: subject_id });
    let subjectUpdate;
    try {
      subjectUpdate = await knex("subject")
        .where({ subject_id: subject_id })
        .update({
          subject_id: subject_id,
          subject_name: subject_name,
          subject_level:subject_level,
          subject_lang:subject_lang,
          subject_desc:subject_desc,
          subject_price:subject_price
        });
      reply.code(200).send({ message: `Successfull edit` });
    } catch (error) {
      reply.send(error);
    }
    
  };

const deleteSubjectById = async (req, reply) => {  //delete subject by id
  const { subject_id } = req.params;
  try {
    await knex("subject").where({ subject_id: subject_id }).del();
    reply.send({ message: `Subject ${subject_id} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getSubject,
  getSubjectById,
  getSubjectLevel,
  addSubject,
  deleteSubjectById,
  updateSubjectById
};