const connection = require('./connection');

const getAllMsgs = async () => {
  const myDB = await connection();
  const allMsg = await myDB.collection('messages').find({}).toArray();
  return allMsg;
};

const getAllUsers = async () => {
  const myDB = await connection();
  const alluser = await myDB.collection('users').find({}).toArray();
  return alluser;
};

const modelCreateMsg = async (username, text, time) => {
  const myDB = await connection();
  await myDB.collection('messages').insertOne({ username, text, time });
  return { code: true };
};

const modelCreateUser = async (id, name) => {
  const myDB = await connection();
  await myDB.collection('users').insertOne({ id, name });
  return { code: true };
};

module.exports = {
  getAllMsgs,
  modelCreateMsg,
  modelCreateUser,
  getAllUsers,
};