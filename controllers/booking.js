const { knex } = require("../index.js");

const bookTime = async (req, reply) => {
  const { timetable_id } = req.params;  
  const currentUser = req.user?.user_id; 

  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  const trx = await knex.transaction();
  try {
    const timetable = await trx('timetable').select('timetable_bool').where({ timetable_id: timetable_id }).first();
    
    if (timetable.timetable_bool) {
      return reply.status(409).send({ message: 'This time is already booked.' });
    }

    await trx('timetable')
      .where({ timetable_id })
      .update({ timetable_bool: true });

    await trx('booking').insert({
      user_id: currentUser,  
      timetable_id,  
      booked_at: knex.fn.now(), 
    });

    await trx.commit();
    reply.code(200).send({ message: `Timetable ${timetable_id} has been successfully booked.` });
  } catch (error) {
    await trx.rollback();
    reply.send(error);
  }
};


const getUserBookings = async (req, reply) => {
    const userId = req.user.user_id; 
    try {
        const bookings = await knex("booking")
            .select("booking.booking_id", "subject.subject_name", "timetable.timetable_day", "timetable.start_time", "timetable.end_time")
            .leftJoin("timetable", "booking.timetable_id", "timetable.timetable_id")
            .leftJoin("subject", "timetable.subject_id", "subject.subject_id") 
            .where("booking.user_id", userId);
        
        reply.send(bookings);
    } catch (error) {
        console.error(error);
        reply.code(500).send({ message: "Hiba történt a foglalások lekérdezése során." });
    }
};

const deleteBooking = async (req, reply) => {
    const { booking_id } = req.params; 
    const userId = req.user.user_id; 

    try {
        
        const booking = await knex("booking").where({ booking_id, user_id: userId }).first();

        if (!booking) {
            return reply.code(404).send({ message: "A foglalás nem található." });
        }
        await knex("booking").where({ booking_id }).del();
        await knex("timetable").where({ timetable_id: booking.timetable_id }).update({ timetable_bool: false });

        reply.send({ message: "A foglalás sikeresen törölve." });
    } catch (error) {
        console.error(error);
        reply.code(500).send({ message: "Hiba történt a foglalás törlése során." });
    }
};



module.exports = {
  bookTime,
  getUserBookings,
  deleteBooking
};
