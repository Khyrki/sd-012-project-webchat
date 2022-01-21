const connection = require('./connection');

const createMessagesHistory = async (message, nickname, timestamp) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message, nickname, timestamp });
};

module.exports = createMessagesHistory;