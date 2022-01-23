const connection = require('./connection');

const get = async () => (await connection())
  .collection('messages')
  .find()
  .toArray();

const post = async (payload) => (await connection())
  .collection('messages')
  .insertOne(payload);

module.exports = {
  get,
  post,
};
