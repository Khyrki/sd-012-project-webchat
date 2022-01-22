const connection = require('./connection');

const newMessage = ({ message, nickname, timestamp }) => connection()
  .then((db) => db.collection('messages').insertOne({
    message,
    nickname,
    timestamp,
  }))
  .then((result) => result);

const getAllMessages = () => connection()
  .then((db) => db.collection('messages').find({}).toArray())
  .then((result) => result);

module.exports = {
  newMessage,
  getAllMessages,
};