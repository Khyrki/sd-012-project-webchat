const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  console.log(messages);
  return messages;
};

const create = async (nickname, message, timestamp) => {
  const db = await connection();
  await db.collection('messages').insertOne({ nickname, message, timestamp });
};

module.exports = {
  getAll,
  create,
};
