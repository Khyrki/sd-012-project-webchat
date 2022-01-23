const connect = require('./connection');

  const create = async (message) => {
    const db = await connect();
    const collection = db.collection('messages');
    await collection.insertOne({ ...message });
  };

  const getAll = async () => {
    const db = await connect();
    const collection = db.collection('messages');
    const messages = await collection.find().toArray();
    return messages;
  };

module.exports = { getAll, create }; 