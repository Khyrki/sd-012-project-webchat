const connection = require('./connection');

const create = async (nickname, chatMessage, timestamp) => {
  const db = await connection();
  const data = await db.collection('messages').insertOne({
    nickname,
    message: chatMessage,
    timestamp,
  });
  return data.ops[0];
};

module.exports = create;
