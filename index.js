require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const { knex } = require("./database");

fastify.register(require("@fastify/cors"), {  //register CORS
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
});

fastify.register(require("@fastify/jwt"), {  //register JWT token
  secret: process.env.IDOPONTFOGLALO_JWT_SECRETKEY || "secretKeyForIdopontfoglalo213edaefw",
});

fastify.decorate("authenticate", async function (request, reply) {  
  try {
    await request.jwtVerify(); 
  } catch (err) {
    reply.send(err);
  }
});

fastify.register(require('@fastify/multipart'));  //register multipart form-data parsing plugin

fastify.register(require("@fastify/swagger"));  //register Swagger documentation plugin

fastify.register(require("@fastify/swagger-ui"), {  //register Swagger UI plugin for visualizing API documentation
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

module.exports = { fastify, knex };


const user = require("./routes/user.js");
const timetable = require("./routes/timetable.js");
const role = require("./routes/role.js");
const subject = require("./routes/subject.js");
const permission = require("./routes/permission.js");
const user_log = require("./routes/user_log.js");
const timetable_log = require("./routes/timetable_log.js");
const subject_log = require("./routes/subject_log.js");
const user_role = require("./routes/user_role.js");
const role_permission = require("./routes/role_permission.js");
const booking = require("./routes/booking.js");


const start = async () => {
  for (;;) {
    try {
      await knex.raw("select 1+1");
      break;
    } catch (err) {
      console.log(err);
      console.log("Unable to connect to PGSQL, waiting...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  
  let version = await knex.raw(
    `SELECT default_version, installed_version FROM pg_available_extensions where name = 'timescaledb'`
  );
  if (!version) {
    console.log("ERROR: TimescaleDB is not installed on the DB instance");
    process.exit(1);
  }

  await knex.migrate.latest({ directory: "dbmigrations" });

  fastify.register(user);
  fastify.register(timetable);
  fastify.register(role);
  fastify.register(subject);
  fastify.register(permission);
  fastify.register(user_log);
  fastify.register(timetable_log);
  fastify.register(subject_log);
  fastify.register(user_role);
  fastify.register(role_permission);
  fastify.register(booking);

  fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });
};

start();
