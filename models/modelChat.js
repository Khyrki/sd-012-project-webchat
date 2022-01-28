const connection = require('./connection');

const historySave = async (data) => {
  const db = await connection();
  const response = await db.collection('messages').insertOne(data);
  return response;
};

const getHistory = async () => {
  const db = await connection();
  const response = await db.collection('messages').find().toArray();
  return response;
};

module.exports = {
  historySave,
  getHistory,
}; 