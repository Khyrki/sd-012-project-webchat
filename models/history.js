const connection = require('./connection');

const addHistory = async ({ timeStamp, nickname, chatMessage }) => {
  const db = await connection();

  const newHistory = await
   db.collection('messages').insertOne({ timeStamp, nickname, chatMessage });

  return newHistory;
};

const getAll = async () => {
  const db = await connection();

  const allHistory = await db.collection('messages').find().toArray();

  return allHistory;
};

module.exports = { addHistory, getAll };
