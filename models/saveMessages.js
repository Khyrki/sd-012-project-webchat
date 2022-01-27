const connection = require('./connection');

module.exports = async (entity) => {
  (await connection())
    .collection('messages').insertOne(entity);
};