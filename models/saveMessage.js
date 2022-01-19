const connection = require('./connection');

module.exports = async ({ chatMessage, nickname, timestamp }) => {
  const db = await connection();
  const collection = await db.collection('messages');
  const { insertedId } = await collection.insertOne({ chatMessage, nickname, timestamp });
  return {
    id: insertedId,
    chatMessage,
    nickname,
    timestamp,
  };
};