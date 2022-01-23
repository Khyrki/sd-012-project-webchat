const createDate = require('../../utils/createDate');
const { connection } = require('../connection');

module.exports = async ({ message, nickname }) => {
  const timestamp = createDate(new Date());
  const db = await connection();
  const result = await db.collection('messages').insertOne({ message, nickname, timestamp });
  return result;
};
