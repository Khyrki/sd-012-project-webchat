const connection = require('./connection');

const getAllMsgs = async () => {
  const myDB = await connection();
  const allMsg = await myDB.collection('messages').find({}).toArray();
  return allMsg;
};

const modelCreateMsg = async (message) => {
  const myDB = await connection();
  await myDB.collection('messages').insertOne({ message });
  return { code: true };
};

module.exports = {
  getAllMsgs,
  modelCreateMsg,
};