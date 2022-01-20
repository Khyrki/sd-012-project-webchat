const connection = require('../connection');

module.exports = async (newMessage) => 
    (await connection())
    .collection('messages')
    .insertOne(newMessage);