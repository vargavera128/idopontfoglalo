const { knex } = require("../index.js");

const getSubject = async (req, reply) => {  // Get all subjects
  try {
    const subjects = await knex("subject").select("*");
    reply.send(subjects);
  } catch (error) {
    reply.status(500).send({ message: 'Error retrieving subjects', error: error.message });
  }
};

const getSubjectById = async (req, reply) => {  // Get subject by ID
  const { subject_id } = req.params;
  try {
    const subject = await knex("subject").select("*").where({ subject_id }).first();
    if (subject) {
      reply.send(subject);
    } else {
      reply.status(404).send({ message: 'Subject not found' });
    }
  } catch (error) {
    reply.status(500).send({ message: 'Error retrieving subject', error: error.message });
  }
};

const getSubjectLevel = async (req, reply) => {  // Get subjects by subject level
  const { subject_level } = req.params;
  try {
    const subjects = await knex("subject").select("*").where({ subject_level: subject_level });
    reply.send(subjects);
  } catch (error) {
    reply.status(500).send({ message: 'Error retrieving subjects by level', error: error.message });
  }
};

const addSubject = async (req, reply) => {  // Add new subject
  const { subject_name, subject_level, subject_lang, subject_desc, subject_type, subject_price } = req.body;

  if (!subject_name || !subject_level || !subject_lang || !subject_desc || !subject_type || subject_price === undefined) {
    return reply.status(400).send({ message: 'All fields are required.' });
  }

  const currentUser = req.user?.user_id;
  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  const trx = await knex.transaction();
  
  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    
    const newSubject = await trx("subject").insert({
      subject_name,
      subject_level,
      subject_lang,
      subject_desc,
      subject_type,
      subject_price,
      created_at: knex.fn.now(),  // Timestamp for creation
    }).returning('*');

    await trx.commit();
    reply.status(201).send(newSubject);
  } catch (error) {
    await trx.rollback();
    console.error("Error inserting subject:", error);
    reply.status(500).send({ message: 'Error adding subject', error: error.message });
  }
};

const updateSubjectById = async (req, reply) => {  // Update subject by ID
  const { subject_id } = req.params;
  const { subject_name, subject_level, subject_lang, subject_desc, subject_type, subject_price } = req.body;
  const currentUser = req.user?.user_id;

  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  const trx = await knex.transaction();

  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    const subject = await trx("subject").where({ subject_id }).first();

    if (!subject) {
      return reply.status(404).send({ message: 'Subject not found' });
    }

    await trx("subject").where({ subject_id }).update({
      subject_name: subject_name || subject.subject_name,
      subject_level: subject_level || subject.subject_level,
      subject_lang: subject_lang || subject.subject_lang,
      subject_desc: subject_desc || subject.subject_desc,
      subject_type: subject_type || subject.subject_type,
      subject_price: subject_price !== undefined ? subject_price : subject.subject_price,
      created_at: knex.fn.now(),  
    });

    await trx.commit();
    reply.status(200).send({ message: `Subject ${subject_id} has been updated` });
  } catch (error) {
    await trx.rollback();
    reply.status(500).send({ message: 'Error updating subject', error: error.message });
  }
};

const deleteSubjectById = async (req, reply) => {  // Delete subject by ID
  const { subject_id } = req.params;
  const currentUser = req.user?.user_id;

  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  const trx = await knex.transaction();

  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    const deletedRows = await trx("subject").where({ subject_id }).del();

    if (deletedRows) {
      await trx.commit();
      reply.send({ message: `Subject ${subject_id} has been removed` });
    } else {
      reply.status(404).send({ message: 'Subject not found' });
    }
  } catch (error) {
    await trx.rollback();
    reply.status(500).send({ message: 'Error deleting subject', error: error.message });
  }
};

module.exports = {
  getSubject,
  getSubjectById,
  getSubjectLevel,
  addSubject,
  updateSubjectById,
  deleteSubjectById,
};
