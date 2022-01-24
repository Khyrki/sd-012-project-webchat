const connection = require('./connection');

const listMessages = async () => {
  try {
    const db = await connection();
    const findAll = await db.collection('messages').find().toArray();
    return findAll;
  } catch (err) {
    console.log(err);
  }
};

 const createMes = async (message) => {
  try {
    const db = await connection();
    const createMessage = await db.collection('messages').insertOne(message);
    return createMessage;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listMessages,
  createMes,
}; 