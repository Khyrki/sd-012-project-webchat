const connection = require('./connection');

module.exports.createMessage = async (message) => {
  const db = await connection();
  await db.collection('messages').insertOne(message);
};

module.exports.getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};