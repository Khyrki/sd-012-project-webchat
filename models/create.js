const connection = require('./connection');

const create = async (chatMessage, nickname, date) => {
  const db = await connection();
  const result = await db
    .collection('messages').insertOne({ message: chatMessage, nickname, timestamp: date });

  return result.ops[0];
};

module.exports = create;
