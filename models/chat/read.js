const mongoConnection = require('../connection');

module.exports = async () => {
  try {
    const db = await mongoConnection();

    const messages = await db.collection('messages').find().toArray();

    return messages;
  } catch (error) {
    console.log(error);
  }
};