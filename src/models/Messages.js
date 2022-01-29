const connection = require('./connection');

const COLLECTION_NAME = 'messages';

const insertOne = async (message) => (
  connection().then((db) => db.collection(COLLECTION_NAME).insertOne(message))
);

const getMessages = async () => (
  connection().then((db) => db.collection(COLLECTION_NAME).find().toArray())
);

module.exports = {
  insertOne,
  getMessages,
};