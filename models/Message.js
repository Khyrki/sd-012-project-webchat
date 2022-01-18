const connection = require('./connection');

const create = async (data) => {
  connection().then((db) => db.collection('messages').insertOne(data));
};

const getAll = async () => connection()
  .then((db) => db.collection('messages').find({}).toArray());

module.exports = { create, getAll };
