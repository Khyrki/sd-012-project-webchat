const getConnection = require('./connection');

const saveMessage = async (data) => {
  const db = await getConnection();

  const savedMessage = await db.collection('messages').insertOne(data);

  return savedMessage;
};

const getAllMessages = async () => {
  const db = await getConnection();
  const allMessages = db.collection('messages').find().toArray();
  return allMessages;
};

module.exports = {
  saveMessage,
  getAllMessages,
};
