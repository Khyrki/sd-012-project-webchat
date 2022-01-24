const conn = require('../connection');

module.exports = async () => 
  conn().then((db) => db.collection('messages').find().toArray());
