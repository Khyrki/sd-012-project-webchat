const connection = require('./connection');

const getMsgHistory = async () => {
const db = await connection();
const result = await db.collection('messages').find().toArray();
return result;
};

module.exports = getMsgHistory; 