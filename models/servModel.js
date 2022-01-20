const connection = require('./connection');

const addMessage = async (message, nickname, timestamp) => {
  const db = await connection();
  const answer = await db.collection('messages')
  .insertOne({ message, nickname, timestamp });
  return answer.ops[0];
};

const getMessage = async () => {
  const db = await connection();
  const answer = await db.collection('messages')
  .find().toArray();
  return answer;
};

module.exports = {
  addMessage,
  getMessage,
};