const { connection } = require('../connection');

module.exports = async () => {
  const db = await connection();
  const result = await db.collection('messages').find().toArray();
  return result;
};
