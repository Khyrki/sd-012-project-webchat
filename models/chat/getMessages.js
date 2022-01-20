const connection = require('../connection');

module.exports = async () => {
  const db = await connection();
  const collection = await db.collection('messages');
  const chatHistory = await collection.find().toArray();

  return chatHistory;
};
