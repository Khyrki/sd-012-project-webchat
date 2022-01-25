const connection = require('./connection');

const list = async () => (await connection())
  .collection('messages')
  .find().toArray();

module.exports = list;