const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

const insert = async ({ message, nickname, timestamp }) => {
  connection().then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }));
};

module.exports = { getAllMessages, insert };