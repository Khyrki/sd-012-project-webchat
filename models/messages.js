const connection = require('./connection');

const COLLECTION = 'messages';

async function createNewMessage(messageData) {
  return connection()
    .then((db) => db.collection(COLLECTION)
      .insertOne(messageData));
}

async function getAllMessages() {
  return connection()
    .then((db) => db.collection(COLLECTION).find().toArray());
}

module.exports = {
  createNewMessage, getAllMessages,
};