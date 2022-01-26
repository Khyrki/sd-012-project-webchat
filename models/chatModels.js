const connection = require('./connection');

const findAll = async () => {
  const result = (await connection()).collection('messages').find().toArray();
  return result;
};

const insertNewUser = async (entity) => {
  const result = (await connection()).collection('messages').insertOne(entity);
  return result;
};

module.exports = {
  findAll,
  insertNewUser,
};