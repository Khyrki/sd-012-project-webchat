const { ObjectId } = require('mongodb');
const mongoConnection = require('../connection');

module.exports = async (newMessage) => {
  try {
    const db = await mongoConnection();

    const { insertedId: { id } } = await db.collection('messages').insertOne(newMessage);

    return { ...newMessage, _id: ObjectId(id).toString };
  } catch (error) {
    console.log(error);
  }
};