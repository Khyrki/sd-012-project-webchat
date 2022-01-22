const connection = require('./connection');

module.exports = async () => {
  try {
    const db = await connection();
    const messages = await db.collection('messages').find().toArray();
    return messages;
  } catch (err) {
    console.log(err);
  }
};
