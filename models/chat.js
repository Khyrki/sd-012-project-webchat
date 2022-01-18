const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const messages = db.collection('messages').find().toArray();
  return messages;
};

const insertOne = async (info) => {
  const db = await connection();
  await db.collection('messages').insertOne(info);
};

module.exports = {
  getAll,
  insertOne,
};
