const connection = require('./connection');

const create = async (chatMessage, nickname, date) => {
  const result = await (await connection())
    .collection('messages')
    .insertOne({ message: chatMessage, nickname, timestamp: date });

  return result.ops[0];
};

module.exports = create;