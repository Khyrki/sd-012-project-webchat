const connection = require('./connection');

const getAllMessages = async () => (
  (await connection()).collection('messages').find().toArray()
);

const addNewMessage = async (message) => (
  (await connection()).collection('messages').insertOne(message)
);

module.exports = {
  getAllMessages,
  addNewMessage,
};
