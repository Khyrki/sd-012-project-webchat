const connection = require('./connection');

async function createMessage(message) {
  const db = await connection();
  await db.collection('messages').insertOne(message);
}

async function getAllMessages() {
  const db = await connection();
  const response = await db.collection('messages').find().toArray();
  return response;
}

module.exports = {
  createMessage,
  getAllMessages,
};
