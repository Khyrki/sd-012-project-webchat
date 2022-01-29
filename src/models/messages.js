const db = require('./connection');

const documentName = 'messages';

const insertMessage = async (message) => {
  const collection = await db.collection(documentName);
  await collection.insertOne(message);
};

module.exports = {
  insertMessage,
};