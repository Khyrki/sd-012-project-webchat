const connection = require('./connection');

const lockMessage = async (message) => {
  const db = await connection();
  const { saveMsg } = await db.collection('messages').insertOne(message);
  return saveMsg;
};

const catchMessages = async () => {
  const db = await connection();
  const data = await db.collection('messages').find({}).toArray();
  return data;
};

module.exports = {
  lockMessage,
  catchMessages,
};