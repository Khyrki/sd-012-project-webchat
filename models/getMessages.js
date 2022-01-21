const connection = require('./connection');

module.exports = async () => {
  const messages = await (await connection()).collection('messages')
    .find().toArray();
  return messages;
};