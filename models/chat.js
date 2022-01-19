const connection = require('./connection');

const getAllMessages = async () => connection()
  .then((db) => db.collection('messages').find().toArray());

const create = async (obj) => connection()
  .then((db) => {
    db.collection('messages').insertOne({ ...obj, timestamp: Date() });
  });

module.exports = {
  getAllMessages,
  create,
};
