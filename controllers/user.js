const { knex } = require("../index.js");
const { pbkdf2 } = require("crypto");
const  {fastify}  = require("../index.js");

const getUsers = async (req, reply) => {  //get all users
  try {
    const user = await knex("user").select("*");
    reply.send(user);
  } catch (error) {
    reply.send(error);
  }
};

const getUserById = async (req, reply) => {  //get user by id
  const { user_id } = req.params;
  try {
    const user = await knex("user").select("*").where({ user_id: user_id });
    reply.send(user[0]);
  } catch (error) {
    reply.send(error);
  }
};


const getUserByEmail = async (req, reply) => {  //get user by email
  const { email } = req.params;
  try {
    const user = await knex("user").select("*").where({ email: email });
    reply.send(user[0]);
  } catch (error) {
    reply.send(error);
  }
};


const addUser = async (req, reply) => {  //add new user
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { username } = req.body;
  let hash = await new Promise((resolve, reject) => {
    pbkdf2(password, '', 100000, 64, "sha512", async (err, derivedKey) => {
      if (err) throw err;
      resolve(derivedKey.toString("hex"));
    });
  });
  try {
    await knex("user").insert({      
      email: email.toLowerCase(),
      password: await hash,
      username: username,
      name: name,
      created_at: knex.fn.now(),    
    });

    reply.code(200).send({ message: `User ${username} has been added` });
  } catch (error) {
    if(error.message.includes("duplicate key value violates unique constraint")){
      console.log("DUPLICATE")
      reply.code(409).send({ message: `User already exists` });
    }
    console.log(error)
  }
};

const deleteUserById = async (req, reply) => {  //delete user by id
  const { user_id } = req.params;
  try {
    await knex("user").where({ user_id: user_id }).del();
    reply.send({ message: `Item ${user_id} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};


const deleteUserByEmail = async (req, reply) => {  //delete user by email
  const { email } = req.params;
  try {
    await knex("users").where({ email: email }).del();
    reply.send({ message: `User ${email} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};


const deleteUserByUsername = async (req, reply) => {  //delete user by username
  const { username } = req.params;
  try {
    await knex("users").where({ username: username }).del();
    reply.send({ message: `User ${username} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};

const updateUserById = async (req, reply) => {  //update user by id
  const { email } = req.body;
  const { password } = req.body;
  const { name } = req.body;
  const { username } = req.body;
  const { user_id } = req.params;
  const { pbkdf2 } = await import("crypto");
  const user = await knex("user").where({ user_id: user_id });
  let userUpdate;
  if (password != undefined) {
    let hash = await new Promise((resolve, reject) => {
      pbkdf2(
        password,
        '',//user[0].id,
        100000,
        64,
        "sha512",
        async (err, derivedKey) => {
          if (err) throw err;
          resolve(derivedKey.toString("hex"));
        }
      );
    });
    try {
      userUpdate = await knex("user")
        .where({ user_id: user_id })
        .update({
          password: (await hash) || user[0].password,
          user_id: user[0].user_id,
          name: name || user[0].name,
          email: email || user[0].email,
          username: user[0].username,
        });
      reply.code(200).send({ message: `Successfull edit` });
    } catch (error) {
      reply.send(error);
    }
  } else {
    try {
      userUpdate = await knex("user")
        .where({ username: username })
        .update({
          username: username || user[0].username,
          name: name || user[0].name,
        });
      reply.send(userUpdate[0]);
    } catch (error) {
      reply.send(error);
    }
  }
};


const loginUserByEmail = async (req, reply) => {  //login by email
  const { email } = req.body;
  const { password } = req.body;
  try {
    const userData = await knex("user").select("*").where({ email: email });
    let hash;
    if (userData.length > 0) {
      let correct = await new Promise((resolve, reject) => {
        pbkdf2(
          password,
          '',//userData[0].id,
          100000,
          64,
          "sha512",
          async (err, derivedKey) => {
            if (err) throw err;
            hash = derivedKey.toString("hex");
            console.log("HASH: ", hash);
            console.log("PASS: ", userData[0].password);

            hash === userData[0].password ? resolve(true) : resolve(false);
          }
        );
      });
      if (correct) {
        const token = fastify.jwt.sign({ user_id: user.user_id, username: user.username }, { expiresIn: "24h" });
        reply.code(201).send({ message: `Successfull login!`, jwt: token });
      } else {
        reply.code(201).send({ message: `Wrong Username or password.` });
      }
    } else reply.code(201).send({ message: `Wrong Username or password.` });
  } catch (error) {
    reply.send(error);
  }
};

const loginUserByUsername = async (req, reply) => {  //login by username
  const { username } = req.body;
  const { password } = req.body;
  try {
    const userData = await knex("user").select("*").where({ username: username });
    let hash;
    if (userData.length > 0) {
      let correct = await new Promise((resolve, reject) => {
        pbkdf2(
          password,
          '',//userData[0].id,
          100000,
          64,
          "sha512",
          async (err, derivedKey) => {
            if (err) throw err;
            hash = derivedKey.toString("hex");
            console.log("HASH: ", hash);
            console.log("PASS: ", userData[0].password);
            hash === userData[0].password ? resolve(true) : resolve(false);
          }
        );
      });
      if (correct) {
        const token = fastify.jwt.sign({ user_id: user.user_id, username: user.username }, { expiresIn: "24h" });
        reply.code(201).send({ message: `Successfull login!`, jwt: token });
      } else {
        reply.code(201).send({ message: `Wrong Username or password.` });
      }
    } else reply.code(201).send({ message: `Wrong Username or password.` });
  } catch (error) {
    reply.send(error);
  }
};

const checkAuth = async (request, reply) => {  //checkAuth
  user_id = request.user;
  const userInfo = await knex('user')  //get user info
      .select(
        'user.username',
        'role.role_name',
        'role.role_desc',
        'permission.permission_name',
        'permission.permission_desc'
      )
      .leftJoin('user_role', 'user.user_id', 'user_role.user_id')
      .leftJoin('role', 'user_role.role_id', 'role.role_id')
      .leftJoin('role_permission', 'role.role_id', 'role_permission.role_id')
      .leftJoin('permission', 'role_permission.permission_id', 'permission.permission_id')
      .where('user.user_id', user_id)

  reply.send(userInfo);
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUserById,
  deleteUserByEmail,
  deleteUserByUsername,
  updateUserById,
  loginUserByEmail,
  loginUserByUsername,
  getUserByEmail,
  checkAuth,
};
