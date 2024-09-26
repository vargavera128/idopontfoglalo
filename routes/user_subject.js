const {
    getUserSubjects,
    getUserSubjectById,
    updateUserSubjectById,
    deleteUserSubjectById,
    addUserSubject,
  } = require("../controllers/user_subject.js");
  
  const UserSubject = {  //Struct for UserSubject
    type: "object",
    properties: {
      user_subject_id: { type: "integer" },
      user_id: { type: "integer" },
      subject_id: { type: "integer" },
      created_at: { type: "string" },
    },
  };
  
  const getUserSubjectsOpts = {    //Option for get all user_subject entries
    description: "Gets all user-subject relationships",
    schema: {
      response: {
        200: {
          type: "array",
          items: UserSubject,
        },
      },
    },
    handler: getUserSubjects,
  };
  
  const getUserSubjectOpts = {  //Option for get user_subject by id
    schema: {
      description: "Gets user-subject relationship by id",
      response: {
        200: {
          type: "array",
          items: UserSubject,
        },
      },
    },
    handler: getUserSubjectById,
  };
  
  const updateUserSubjectOpts = {  //Option for update user_subject by id
    schema: {
      description: "Updates user-subject relationship by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: updateUserSubjectById,
  };
  
  const postUserSubjectOpts = {  //Option for add new user_subject entry
    schema: {
      description: "Adds new user-subject relationship",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: addUserSubject,
  };
  
  const deleteUserSubjectOpts = {  //Option for delete user_subject by id
    schema: {
      description: "Deletes user-subject relationship by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: deleteUserSubjectById,
  };
  
  function userSubjectRoutes(fastify, options, done) {
    fastify.get("/user_subject", getUserSubjectsOpts);
    fastify.get("/user_subject/:user_subject_id", getUserSubjectOpts);
    fastify.put("/user_subject/:user_subject_id", updateUserSubjectOpts);
    fastify.post("/user_subject", postUserSubjectOpts);
    fastify.delete("/user_subject/:user_subject_id", deleteUserSubjectOpts);
    done();
  }
  
  module.exports = userSubjectRoutes;
  