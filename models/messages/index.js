const { connection } = require('../connection');

const findAll = async () => {
  const db = await connection();
  return db.collection('messages').find({}).toArray();
};

const create = async (params) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne(params);
  return result;
};

module.exports = { findAll, create };