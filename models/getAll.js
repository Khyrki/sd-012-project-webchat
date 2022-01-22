const connection = require('./connection');

const getAll = async () => (await connection())
  .collection('messages')
  .find().toArray();

module.exports = getAll;
