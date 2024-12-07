const {
    getUsers,
    getUserById,
    getUserByUsername,
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
    onRequest: [fastify.authenticate]
  };
  
  const getItemOpts = {  // Options for get one item
    schema: {
      description: "Get user by id",
      response: {
        200: Item,
      },
    },
    handler: getUserById,
    onRequest: [fastify.authenticate]
  };

  const getItemOptsU = {  // Options for get one item
    schema: {
      description: "Get user by username",
      response: {
        200: Item,
      },
    },
    handler: getUserByUsername,
    onRequest: [fastify.authenticate]
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
    onRequest: [fastify.authenticate]
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
    onRequest: [fastify.authenticate]
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
    onRequest: [fastify.authenticate],
    handler: getUserByEmail,
    
  };
  
  const checkAuthOpts = {
    onRequest: [fastify.authenticate],
    handler: checkAuth,
  };
  



  function UserRoutes(fastify, options, done) {
    fastify.get("/user", getItemsOpts);  
    fastify.get("/user/:user_id", getItemOpts);
    fastify.get("/user2/:username", getItemOptsU);
    fastify.get("/userEmail/:email", getUserOpts);
    fastify.post("/user", postItemOpts);   
    fastify.delete("/user/:user_id", deleteItemOpts);  
    fastify.put("/user/:user_id", updateItemOpts);  
    fastify.post("/user/login", loginUserOpts);  
    fastify.post("/user/loginUsername", loginUserOptsUsername)
    fastify.get("/checkAuth",checkAuthOpts)
  
    done();
  }
  module.exports = UserRoutes;
  