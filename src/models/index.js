const connection = require('./connection');

module.exports.getAllMessages = async () => {
  const database = await connection();
  const newMessage = await database.collection('messages').find().toArray();
  return newMessage;
};

module.exports.createMessages = async (message, nickname, timestamp) => {
  const database = await connection();
  await database.collection('messages').insertOne({ message, nickname, timestamp });
};