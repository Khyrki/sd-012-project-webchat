const connection = require('../connection');

const findAllMessages = () => {
  const allMessages = connection()
    .then((db) => db.collection('messages').find({}).toArray())
    .then((result) => result);
  return allMessages;
};

const postMessages = (message, nickname, timestamp) => {
  const msg = connection()
    .then((db) => db.collection('messages').insertOne(
      { message, nickname, timestamp },
    ))
    .then((result) => result);
  return msg;
};

module.exports = { findAllMessages, postMessages };