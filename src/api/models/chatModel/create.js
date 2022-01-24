const conn = require('../connection');

module.exports = async (message, nickname, timestamp) => 
  conn().then((db) => db.collection('messages').insertOne(message, nickname, timestamp));
