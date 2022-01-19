const connection = require('./connection');

const COLLECTION = 'messages';

const create = async (message) => {
  const db = await connection();
  await db.collection(COLLECTION).insertOne(message);
};

const getAll = async () => {
  const db = await connection();
  return db.collection(COLLECTION).find().toArray();
};

module.exports = {
  create,
  getAll,
};
