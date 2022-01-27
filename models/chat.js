const connection = require('./connection');

const createMessage = async ({ timeStamp, nickname, chatMessage }) => {
  const db = await connection();
  const newMessage = await db.collection('messages')
    .insertOne({ timeStamp, nickname, chatMessage });
  return newMessage;
};

const findAll = async () => {
  const db = await connection();
  const allMessages = await db.collection('messages').find().toArray();
  return allMessages;
};

module.exports = {
  createMessage,
  findAll,
};