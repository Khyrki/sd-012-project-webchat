const connection = require('./connection');

const getMsgs = () => connection().then(
  (db) => db.collection('messages').find({}).toArray(),
).then((res) => res);

const createMsg = (message, nickname, timestamp) => connection().then(
  (db) => db.collection('messages').insertOne({ message, nickname, timestamp }),
).then((res) => res);

module.exports = { getMsgs, createMsg };
