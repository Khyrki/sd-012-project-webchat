const connection = require('./connection');

module.exports = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  const collection = await db.collection('messages');
  const { insertedId } = await collection.insertOne({ message, nickname, timestamp });
  return {
    id: insertedId,
    message,
    nickname,
    timestamp,
  };
};