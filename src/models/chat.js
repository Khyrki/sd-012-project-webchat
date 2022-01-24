const connection = require('./connection');

const addMessage = async (timestamp, message, nickname) => {
  try {
    const db = await connection();
    await db.collection('messages').insertOne({
      timestamp,
      message,
      nickname,
    });
  } catch (err) {
    console.log(err);
  }
};

const getMessages = async () => {
  try {
    const db = await connection();
    const docs = await db.collection('messages').find().toArray();
    return docs;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addMessage,
  getMessages,
};