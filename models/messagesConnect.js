const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const findMessages = await db.collection('messages').find().toArray();

  return findMessages;
};

const insertMessage = async ({ chatMessage, nickname, timestamp }) => {
  const db = await connection();
  const setMessages = await db.collection('messages').insertOne(
    {
      chatMessage,
      nickname,
      timestamp,
    },
  );

  return setMessages;
};

module.exports = {
  getAllMessages,
  insertMessage,
};