const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const messages = db.collection('messages');
  return messages.find().toArray();
};

const create = async (message) => {
  const db = await connect();
  const messages = db.collection('messages');
  await messages.insertOne({ ...message });
};

module.exports = { getAll, create };
