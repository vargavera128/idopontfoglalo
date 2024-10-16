const {
    bookTime,
    getUserBookings,
    deleteBooking
} = require("../controllers/booking.js");
const { fastify } = require("../index.js");


const BookingItem = {
    type: "object",
    properties: {
        timetable_id: { type: "number" }, 
    },
    required: ["subject_id", "timetable_id"], 
};


const BookingResponseItem = {  // Schema for user bookings response
    type: "object",
    properties: {
        booking_id: { type: "string" },
        subject_name: { type: "string" },
        timetable_day: { type: "string" },
        start_time: { type: "string" },
        end_time: { type: "string" },
    },
};


const bookTimeOpts = {  // Options for booking a time slot
    schema: {
        description: "Books a time slot for a subject",
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                },
            },
        },
    },
    handler: bookTime,
    onRequest: [fastify.authenticate],
};


const getUserBookingsOpts = {  // Options for getting user bookings
    schema: {
        description: "Gets all bookings for the current user",
        response: {
            200: {
                type: "array",
                items: BookingResponseItem,
            },
        },
    },
    handler: getUserBookings,
    onRequest: [fastify.authenticate],
};

const deleteBookingOpts = {
    schema: {
        description: "Deletes a booking and resets the timetable",
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                },
            },
            404: {
                type: "object",
                properties: {
                    message: { type: "string" },
                },
            },
            500: {
                type: "object",
                properties: {
                    message: { type: "string" },
                },
            },
        },
    },
    handler: deleteBooking,
    onRequest: [fastify.authenticate],
};


function BookingRoutes(fastify, options, done) {  // Routes for booking and user bookings
    fastify.put("/book/:timetable_id", bookTimeOpts); 
    fastify.get("/user_bookings", getUserBookingsOpts); 
    fastify.delete("/delete_booking/:booking_id",deleteBookingOpts );
    done();
}

module.exports = BookingRoutes;
