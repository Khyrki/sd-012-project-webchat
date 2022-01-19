const connection = require('../connection');

module.exports = async ({ message, nickname, timestamp }) => ((await connection())
  .collection('messages').insertOne({ message, nickname, timestamp })
);