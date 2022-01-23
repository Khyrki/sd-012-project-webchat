const createDate = require('../../utils/createDate');
const { connection } = require('../connection');

const saveMessage = async ({ message, nickname }) => {
  const timestamp = createDate(new Date());
  const db = await connection();
  const result = await db.collection('messages').insertMany({ message, nickname, timestamp });
  return result;
};

module.exports = { saveMessage };
