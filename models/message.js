const connection = require('./connection');

const newMsg = (msn) => connection()
  .then((db) => db.collection('messages').insertOne({ ...msn }));

const getMsg = () => connection()
  .then((db) => db.collection('messages').find().toArray());

module.exports = {
  newMsg,
  getMsg,
};