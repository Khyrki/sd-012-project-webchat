const connection = require('./connection');

const create = async (timestamp, nickname, message) => { 
  const db = await connection();
  const insertMessage = db.collection('messages').insertOne({ message, nickname, timestamp });
  return insertMessage;
};

const getAll = async () => {
  const db = await connection();
  const showMessage = db.collection('messages').find().toArray();
  return showMessage;
};

module.exports = {
  create,
  getAll,
};