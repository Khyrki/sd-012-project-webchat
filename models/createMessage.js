const connection = require('./connection');

module.exports = async (info) => {
  const db = await connection();

  await db.collection('messages').insertOne(info);
};