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

module.exports = {
  addMessage,
};