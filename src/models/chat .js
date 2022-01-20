const connection = require('./connection');

const getAll = async () => {
  try {
    const allMessages = await connection()
      .then((db) => db.collection('messages').find().toArray());
    return allMessages;
  } catch (err) {
    console.log(err);
  }
};

const create = async (messageInfo) => {
  try {
    const { message, nickname, timestamp } = messageInfo;
    const newMessage = await connection()
      .then((db) => db.collection('messages').insertOne({
        message,
        nickname,
        timestamp,
      }));
    return newMessage;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAll,
  create,
};