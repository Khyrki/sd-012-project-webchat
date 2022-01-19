const connection = require('./connection');

const create = async (msg) => {
  const db = await connection();
  const { chatMessage: message, nickname, timestamp } = msg;
  const msgDB = db.collection('messages').insertOne({ message, nickname, timestamp });
  return msgDB;
};

const getMessages = async () => {
  const db = await connection();
  const messages = db.collection('messages').find().toArray();
  return messages;
};

module.exports = { 
  create,
  getMessages,
};