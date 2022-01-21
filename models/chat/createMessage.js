const connection = require('../connection');

module.exports = async (msg) => {
  const db = await connection();
  const { message, nickName, currentDate } = msg;
  const msgDB = db.collection('messages').insertOne({ message, nickName, currentDate });
  return msgDB;
};