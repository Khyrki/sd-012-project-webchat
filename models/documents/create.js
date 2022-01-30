const connection = require('../connection');

module.exports = async (collection, entity) => {
  const insertItem = await (await connection()).collection(collection).insertOne(entity);
  return insertItem.insertedId;
};