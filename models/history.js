const connection = require('./connection');

const messageHistory = async () => {
  const db = await connection();

  const history = await db.collection('messages').find({}).toArray();

  return history;
};

const send = async (message) => {
  const db = await connection();

  const sendMessage = await db.collection('messages').insertOne(message);

  return sendMessage;
};

module.exports = {
  messageHistory,
  send,
};