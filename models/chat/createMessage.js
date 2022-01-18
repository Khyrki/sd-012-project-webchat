const connection = require('../connection');

module.exports = async (message) => {
  const db = await connection();
  const collection = await db.collection('messages');
  await collection.create(message);
};
