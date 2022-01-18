const connection = require('./connection');

module.exports = async (collection, { message, nickname, timestamp }) => {
  const db = await connection;
  const { insertedId } = await db
    .collection(collection)
    .insertOne({ message, nickname, timestamp });
  return {
    id: insertedId,
    message,
    nickname,
    timestamp,
  };
};