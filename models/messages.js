const connection = require('./connection');

const savedMessageDB = async ({ message, nickname, timestamp }) => {
  const db = await connection();

  db.collection('messages').insertOne({ message, nickname, timestamp });
};

const findAllMessages = async () => {
  const db = await connection();

  const messages = await db.collection('messages').find().toArray();

  return messages.map((message) => `${message.datetime} - ${message.nickname}: ${message.message}`);
};

module.exports = {
  savedMessageDB,
  findAllMessages,
}; 