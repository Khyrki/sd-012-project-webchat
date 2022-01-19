const connection = require('./connection');

module.exports = async ({ chatMessage, nickName, treatedDate }) => {
  const db = await connection();
  const collection = await db.collection('messages');
  const { insertedId } = await collection.insertOne({ chatMessage, nickName, treatedDate });
  return {
    id: insertedId,
    chatMessage,
    nickName,
    treatedDate,
  };
};