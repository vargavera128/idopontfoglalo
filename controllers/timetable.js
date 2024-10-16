const { knex } = require("../index.js");

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
    const timetable = await knex("timetable").select("*").where({ timetable_id });
    reply.send(timetable[0]);
  } catch (error) {
    reply.send(error);
  }
};

const getTimesBySubjectId = async (req, reply) => {  //get times by the id of subject
  const { subject_id } = req.params;
  try {
    const timetable = await knex("timetable").select("*").where({ subject_id });
    reply.send(timetable);
  } catch (error) {
    reply.send(error);
  }
};


const addNewTime = async (req, reply) => { // add new time
  const { subject_id, timetable_bool, start_time, end_time, timetable_day } = req.body;
  const currentUser = req.user?.user_id;

  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  const trx = await knex.transaction();
  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);

    await trx("timetable").insert({
      subject_id,
      timetable_day,
      timetable_bool,
      start_time,
      end_time,
      created_at: knex.fn.now(),
    });

    await trx.commit();
    reply.code(200).send({ message: `Time has been added` });
  } catch (error) {
    await trx.rollback();
    if (error.message.includes("duplicate key value violates unique constraint")) {
      reply.code(409).send({ message: `Time already exists` });
    } else {
      reply.send(error);
    }
  }
};

const deleteTimeById = async (req, reply) => {  //delete time by id
  const { timetable_id } = req.params;
  const currentUser = req.user?.user_id;

  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  const trx = await knex.transaction();
  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    await trx("timetable").where({ timetable_id }).del();
    await trx.commit();
    reply.send({ message: `Time ${timetable_id} has been removed` });
  } catch (error) {
    await trx.rollback();
    reply.send(error);
  }
};

const deleteTimeBySubjectId = async (req, reply) => {  //delete time by subject_id
  const { subject_id } = req.params;
  const currentUser = req.user?.user_id;

  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  const trx = await knex.transaction();
  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    await trx("timetable").where({ subject_id }).del();
    await trx.commit();
    reply.send({ message: `Time for subject ${subject_id} has been removed` });
  } catch (error) {
    await trx.rollback();
    reply.send(error);
  }
};


const deleteTimeByDay = async (req, reply) => {  //delete time by day
  const { timetable_day } = req.params;
  const currentUser = req.user?.user_id;

  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  const trx = await knex.transaction();
  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    await trx("timetable").where({ timetable_day }).del();
    await trx.commit();
    reply.send({ message: `Time for day ${timetable_day} has been removed` });
  } catch (error) {
    await trx.rollback();
    reply.send(error);
  }
};

const updateTimeById = async (req, reply) => {  //update time by id
  const { timetable_id } = req.params;
  const { subject_id, timetable_day, timetable_bool, start_time, end_time } = req.body;
  const currentUser = req.user?.user_id;

  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  const trx = await knex.transaction();
  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    const timetable = await trx("timetable").where({ timetable_id }).first();

    if (!timetable) {
      return reply.status(404).send({ message: 'Timetable not found' });
    }

    await trx("timetable").where({ timetable_id }).update({
      subject_id,
      timetable_day,
      timetable_bool,
      start_time,
      end_time,
    });

    await trx.commit();
    reply.code(200).send({ message: `Time ${timetable_id} has been updated` });
  } catch (error) {
    await trx.rollback();
    reply.send(error);
  }
};

const getTimetableBooked = async (request, reply) => {
  try {
    const timetableInfo = await knex('timetable')
      .select('subject.subject_name', 'timetable.timetable_day', 'timetable.start_time', 'timetable.end_time', 'user.username', 'timetable_log.timetable_id')
      .leftJoin('subject', 'timetable.subject_id', 'subject.subject_id')
      .leftJoin('booking', 'booking.timetable_id', 'timetable.timetable_id')
      .leftJoin('user', 'user.user_id', 'user_subject.user_id')
      .leftJoin('timetable_log', 'timetable_log.timetable_id', 'timetable.timetable_id')
      .where('timetable.timetable_bool', true);

    reply.send(timetableInfo);
  } catch (error) {
    reply.send(error);
  }
};

const getTimetableByLevel = async (request, reply) => {
  const { subject_level } = request.params;
  try {
    const timetableInform = await knex('subject')
      .select(
        'subject.subject_id',
        'subject.subject_name',
        'timetable.timetable_id',
        'timetable.timetable_day',
        'timetable.start_time',
        'timetable.end_time',
        'subject.subject_level'
      )
      .join('timetable', 'subject.subject_id', 'timetable.subject_id')
      .where('subject.subject_level', subject_level);

    reply.send(timetableInform);
  } catch (error) {
    reply.send(error);
  }
};

const getFreeTimes = async (request, reply) => {
  try {
    const timetableInfo = await knex('timetable')
      .select('subject.subject_name', 'timetable.timetable_day', 'timetable.start_time', 'timetable.end_time')
      .leftJoin('subject', 'timetable.subject_id', 'subject.subject_id')
      .where('timetable.timetable_bool', false);  

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
      .where('timetable.timetable_day', timetable_day);

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
  getTimetableBooked,
  getTimetableByLevel,
  getFreeTimes,
  getSubjectByDay,
};
