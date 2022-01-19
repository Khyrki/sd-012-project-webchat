const connection = require('./connection');

module.exports = async ({ chatMessage, nickname, treatedDate }) => {
  const db = await connection();
  const collection = await db.collection('messages');
  const { insertedId } = await collection.insertOne({ chatMessage, nickname, treatedDate });
  return {
    id: insertedId,
    chatMessage,
    nickname,
    treatedDate,
  };
};