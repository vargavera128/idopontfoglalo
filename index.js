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


module.exports = { fastify, knex };


const user = require("./routes/user.js");

/*
const user_change_log = require("./routes/user_change_log.js");
const organization = require("./routes/organization.js");
const organization_change_log = require("./routes/organization_change_log.js");
const department = require("./routes/department.js");
const department_change_log = require("./routes/department_change_log.js");
const job = require("./routes/job.js");
const job_change_log = require("./routes/job_change_log.js");
const role = require("./routes/role.js");
const role_user = require("./routes/role_user.js");
const publication = require("./routes/publication.js");
const ip = require("./routes/ip.js");
const publication_change_log = require("./routes/publication_change_log.js");
const ip_change_log = require("./routes/ip_change_log.js");
const monthly_report = require("./routes/monthly_report.js");
*/

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
  
  /*
  dgfWKGZIARUGITPOJOIRHGWPURGA
    dgfWKGZIARUGITPOJOIRHGWPURGA
      dgfWKGZIARUGITPOJOIRHGWPURGA
        dgfWKGZIARUGITPOJOIRHGWPURGA
          dgfWKGZIARUGITPOJOIRHGWPURGA
            dgfWKGZIARUGITPOJOIRHGWPURGA
              dgfWKGZIARUGITPOJOIRHGWPURGA
                dgfWKGZIARUGITPOJOIRHGWPURGA
  */


  fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });
};

start();
