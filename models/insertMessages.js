const connection = require('./connection');

module.exports = async (timestamp, message, nickname) => {
  const insertMessage = await (await connection()).collection('messages')
    .insertOne({ timestamp, message, nickname });
    return {
      id: insertMessage.insertedId,
      message,
      nickname,
      timestamp,
    };
};