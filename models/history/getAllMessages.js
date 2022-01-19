const connection = require('../connection');

module.exports = async () => ((await connection())
  .collection('messages').find({}).toArray()
);