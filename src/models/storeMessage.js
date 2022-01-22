const connection = require('./connection');

module.exports = async ({ message, nickname, timestamp }) => {
  try {
    const db = await connection();
    await db.collection('messages').insertOne({ message, nickname, timestamp });
  } catch (err) {
    console.log(err);
  }
};
