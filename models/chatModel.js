const connection = require('./connection');

const create = async ({ timeStamp, nickname, chatMessage }) => {
  const db = await connection();
  const saveMessage = await db
    .collection('messages')
    .insertOne({ timeStamp, nickname, chatMessage });
  return saveMessage;
};

const getAll = async () => {
  const db = await connection();
  const history = await db.collection('messages').find().toArray();
  return history;
};

module.exports = {
  create,
  getAll,
};
