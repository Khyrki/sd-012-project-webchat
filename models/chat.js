const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'messages';

const saveMessages = async (msgObj) => {
  const insert = (await connection()).collection(collection).insertOne({
    _id: ObjectId(),
    ...msgObj,
  });
  return insert;
};

const getMessages = async () => {
  const getMsgs = (await connection()).collection(collection).find().toArray();
  return getMsgs;
};

module.exports = {
  getMessages,
  saveMessages,
};