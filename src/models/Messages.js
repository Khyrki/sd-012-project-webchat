const connection = require('./connection');

const COLLECTION_NAME = 'messages';

const insertOne = async (message) => (
  connection().then((db) => db.collection(COLLECTION_NAME).insertOne(message))
);

module.exports = {
  insertOne,
};