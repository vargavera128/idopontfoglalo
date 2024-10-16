const { getAllUser, getSomeUserById, addSomeUser, hardDeleteSomeUser, softDeleteSomeUser, updateSomeUser, loginUser } = require("../utils/user_utils.js");


const { knex } = require("../index.js");
const { pbkdf2 } = require("crypto");
const { fastify } = require("../index.js");


const getUsers = async (req, reply) => {  //get all users
  const user = await getAllUser();
  reply.send(user);
};

const getUserById = async (req, reply) => {  // Get user by ID
  const { user_id } = req.params;
  try {
    const user = await knex("user").select("*").where({ user_id }).first();
    if (user) {
      reply.send(user);
    } else {
      reply.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    reply.status(500).send({ message: 'Error retrieving user', error: error.message });
  }
};


const getUserByEmail = async (req, reply) => {  // Get user by email
  const { email } = req.params;
  try {
    const user = await knex("user").select("*").where({ email }).first();
    if (user) {
      reply.send(user);
    } else {
      reply.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    reply.status(500).send({ message: 'Error retrieving user', error: error.message });
  }
};


const addUser = async (req, reply) => {  // Add new user
  const { name, email, password, username } = req.body;

  if (!name || !email || !password || !username) {
    return reply.status(400).send({ message: 'All fields are required.' });
  }

  const currentUser = req.user?.user_id;
  if (!currentUser) {
    return reply.status(401).send({ message: 'User not authenticated.' });
  }

  try {
    const hash = await new Promise((resolve, reject) => {
      pbkdf2(password, '', 100000, 64, "sha512", (err, derivedKey) => {
        if (err) return reject(err);
        resolve(derivedKey.toString("hex"));
      });
    });

    const trx = await knex.transaction();
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);

    await trx("user").insert({
      email: email.toLowerCase(),
      password: hash,
      username,
      name,
      created_at: knex.fn.now(),
    });

    await trx.commit();
    reply.status(201).send({ message: `User ${username} has been added` });
  } catch (error) {
    await trx.rollback();
    console.error("Error inserting user:", error);
    if (error.message.includes("duplicate key value violates unique constraint")) {
      return reply.status(409).send({ message: 'User already exists' });
    }
    reply.status(500).send({ message: 'Error adding user', error: error.message });
  }
};


const deleteUserById = async (req, reply) => {  // Delete user by ID
  const { user_id } = req.params;
  const currentUser = req.user.user_id;

  const trx = await knex.transaction();
  
  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    const deletedRows = await trx("user").where({ user_id }).del();

    if (deletedRows) {
      await trx.commit();
      reply.send({ message: `User ${user_id} has been removed` });
    } else {
      reply.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    await trx.rollback();
    reply.status(500).send({ message: 'Error deleting user', error: error.message });
  }
};


const deleteUserByEmail = async (req, reply) => {  // Delete user by email
  const { email } = req.params;
  const currentUser = req.user.user_id;

  const trx = await knex.transaction();

  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    const deletedRows = await trx("user").where({ email }).del();

    if (deletedRows) {
      await trx.commit();
      reply.send({ message: `User ${email} has been removed` });
    } else {
      reply.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    await trx.rollback();
    reply.status(500).send({ message: 'Error deleting user', error: error.message });
  }
};


const deleteUserByUsername = async (req, reply) => {  // Delete user by username
  const { username } = req.params;
  const currentUser = req.user.user_id;

  const trx = await knex.transaction();

  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    const deletedRows = await trx("user").where({ username }).del();

    if (deletedRows) {
      await trx.commit();
      reply.send({ message: `User ${username} has been removed` });
    } else {
      reply.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    await trx.rollback();
    reply.status(500).send({ message: 'Error deleting user', error: error.message });
  }
};


const updateUserById = async (req, reply) => {  // Update user by ID
  const { email, password, name, username } = req.body;
  const { user_id } = req.params;
  const currentUser = req.user.user_id;

  const trx = await knex.transaction();

  try {
    await trx.raw(`SET LOCAL "myapp.current_user" = '${currentUser}'`);
    const user = await trx("user").where({ user_id }).first();

    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    if (password) {
      const hash = await new Promise((resolve, reject) => {
        pbkdf2(password, '', 100000, 64, "sha512", (err, derivedKey) => {
          if (err) return reject(err);
          resolve(derivedKey.toString("hex"));
        });
      });
      
      await trx("user").where({ user_id }).update({
        password: hash,
        name: name || user.name,
        email: email || user.email,
        username: username || user.username,
      });
    } else {
      await trx("user").where({ user_id }).update({
        name: name || user.name,
        email: email || user.email,
        username: username || user.username,
      });
    }

    await trx.commit();
    reply.status(200).send({ message: `User ${user_id} has been updated` });
  } catch (error) {
    await trx.rollback();
    reply.status(500).send({ message: 'Error updating user', error: error.message });
  }
};


const loginUserByEmail = async (req, reply) => {  // Login user by email
  const { email, password } = req.body;
  
  try {
    const userData = await knex("user").select("*").where({ email }).first();

    if (!userData) {
      return reply.status(401).send({ message: 'Wrong Username or password.' });
    }

    const correct = await new Promise((resolve, reject) => {
      pbkdf2(password, '', 100000, 64, "sha512", (err, derivedKey) => {
        if (err) return reject(err);
        resolve(derivedKey.toString("hex") === userData.password);
      });
    });

    if (correct) {
      const token = fastify.jwt.sign({ user_id: userData.user_id, username: userData.username }, { expiresIn: "24h" });
      reply.status(200).send({ message: 'Successful login!', jwt: token });
    } else {
      reply.status(401).send({ message: 'Wrong Username or password.' });
    }
  } catch (error) {
    reply.status(500).send({ message: 'Error logging in', error: error.message });
  }
};


const loginUserByUsername = async (req, reply) => {  // Login user by username
  const { username, password } = req.body;

  try {
    const userData = await knex("user").select("*").where({ username }).first();

    if (!userData) {
      return reply.status(401).send({ message: 'Wrong username or password.' });
    }

    const correctPassword = await new Promise((resolve, reject) => {
      pbkdf2(password, username, 100000, 64, "sha512", (err, derivedKey) => {
        if (err) return reject(err);
        resolve(derivedKey.toString("hex") === userData.password);
      });
    });

    if (correctPassword) {
      const token = fastify.jwt.sign({ user_id: userData.user_id, username: userData.username }, { expiresIn: '24h' });
      return reply.status(200).send({ success: true, message: 'Successful login!', jwt: token });
    } else {
      return reply.status(401).send({ success: false, message: 'Wrong username or password.' });
    }
  } catch (error) {
    return reply.status(500).send({ success: false, message: error.message || 'Internal Server Error' });
  }
};


const checkAuth = async (request, reply) => {  // Check user authentication
  const user_id = request.user.user_id;
  try {
    const userInfo = await knex('user')
      .select(
        'user.username',
        'role.role_id',
        'role.role_name',
        'role.role_desc',
        'permission.permission_id',
        'permission.permission_name',
        'permission.permission_desc'
      )
      .leftJoin('user_role', 'user.user_id', 'user_role.user_id')
      .leftJoin('role', 'user_role.role_id', 'role.role_id')
      .leftJoin('role_permission', 'role.role_id', 'role_permission.role_id')
      .leftJoin('permission', 'role_permission.permission_id', 'permission.permission_id')
      .where('user.user_id', user_id);

    
    const response = {  //group
      username: userInfo[0]?.username,
      roles: []
    };

    userInfo.forEach((row) => {
      const { role_id, role_name, role_desc, permission_id, permission_name, permission_desc } = row;

      
      let role = response.roles.find(r => r.role_id === role_id);  //does it contain?
      if (!role) {
        role = {
          role_id,
          role_name,
          role_desc,
          permissions: []
        };
        response.roles.push(role);
      }

      
      role.permissions.push({  //add
        permission_id,
        permission_name,
        permission_desc
      });
    });

    reply.send(response);
  } catch (error) {
    reply.status(500).send({ message: 'Error retrieving user info', error: error.message });
  }
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
