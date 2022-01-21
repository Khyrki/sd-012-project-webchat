const connection = require('../connection');

module.exports = async (msg) => {
  const db = await connection();
  const { chatMessage, nickname, currentDate } = msg;
  const msgDB = db.collection('messages').insertOne({ chatMessage, nickname, currentDate });
  return msgDB;
};