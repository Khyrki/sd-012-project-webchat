const connection = require('./connection');

const newMessageModel = ({ nickname, timestamp, chatMessage: message }) => connection()
  .then((db) => db.collection('messages').insertOne({ nickname, timestamp, message }));

const getAllModel = () => connection().then((db) => db.collection('messages').find().toArray());

module.exports = {
  newMessageModel,
  getAllModel,
};