const {
    getUsers,
    getUserById,
    addUser,
    deleteUserById,
    updateUserById,
    loginUserByUsername,
    loginUserByEmail,
    getUserByEmail,
    checkAuth
  } = require("../controllers/user");
  const {fastify} = require("../index.js");
  
  
  const Item = {  // Struct for Item
    type: "object",
    properties: {
      user_id: { type: "integer" },
      name: { type: "string" },
      email: { type: "string" },
      username: {type: "string"},
      password: { type: "string" },
      created_at: { type: "string" },
    },
  };
  
  
  const getItemsOpts = {  // Options for get all items
    schema: {
      description: "Get all users",
      response: {
        200: {
          type: "array",
          items: Item,
        },
      },
    },
    handler: getUsers,
    //onRequest: [fastify.authenticate]
  };
  
  const getItemOpts = {  // Options for get one item
    schema: {
      description: "Get user by id",
      response: {
        200: Item,
      },
    },
    handler: getUserById,
    //onRequest: [fastify.authenticate]
  };
  
  const postItemOpts = {  //Options for add item
    schema: {
      description: "Add a new user",
      body: {
        type: "object",
        properties: {        
          email: { type: "string" },
          password: { type: "string" },
          username: { type: "string" },
          name: { type: "string" },
        },
        required: ['name', 'email', 'username', 'password']
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        409: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: addUser,
    //onRequest: [fastify.authenticate]
  };
  
  const deleteItemOpts = {  //Options for Delete item
    schema: {
      description: "Delete user by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: deleteUserById,
    //onRequest: [fastify.authenticate]
  };
  
  const updateItemOpts = {  //Update one Item
    schema: {
      description: "Update user by id",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: updateUserById,
    //onRequest: [fastify.authenticate]
  };


  const loginUserOpts = {  //Login user by email
    schema: {
      description: "Login user by email",
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ['email', 'password']
      },
      response: {
        201: {
          type: "object",
          properties: {
            message: { type: "string" },
            jwt: { type: "string" },
          },
        },
      },
    },
    handler: loginUserByEmail,
  };
  
  const loginUserOptsUsername = {  //Login user by username
    schema: {
      description: "Login user by username",
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
        required: ['username', 'password']
      },
      response: {
        201: {
          type: "object",
          properties: {
            message: { type: "string" },
            jwt: { type: "string" },
          },
        },
      },
    },
    handler: loginUserByUsername,
  };
  

  const getUserOpts = {  //Option for get user by email
    schema: {
      description: "Get user by email",
      response: {
        200: Item,
      },
    },
    //onRequest: [fastify.authenticate],
    handler: getUserByEmail,
    //onRequest: [fastify.authenticate],
  };
  
  const checkAuthOpts = {
    //onRequest: [fastify.authenticate],
    handler: checkAuth,
  };
  



  function UserRoutes(fastify, options, done) {
    fastify.get("/user", getItemsOpts);  // get -> get
    fastify.get("/user/:user_id", getItemOpts);
    fastify.get("/userEmail/:email", getUserOpts);
    fastify.post("/user", postItemOpts);   // post -> add
    fastify.delete("/user/:user_id", deleteItemOpts);  //delete -> delete
    fastify.put("/user/:user_id", updateItemOpts);  //put -> update
    fastify.post("/user/login", loginUserOpts);  // post -> add
    fastify.post("/user/loginUsername", loginUserOptsUsername)
    fastify.get("/checkAuth",checkAuthOpts)
  
    done();
  }
  module.exports = UserRoutes;
  