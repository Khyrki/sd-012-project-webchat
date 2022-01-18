const connection = require('./connection');

const createMessage = async (messageInfo) => {
  const db = await connection();
  await db.collection('messages').insertOne(messageInfo);
};

const getMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = {
  createMessage,
  getMessages,
};
