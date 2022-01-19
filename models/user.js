const connection = require('./connection');

const create = async (obj) => connection()
  .then((db) => db.collection('users').insertOne(obj));

const getAll = async () => {
  const users = await connection()
    .then((db) => db.collection('users').find().toArray());

  return users;
};

const update = async (id, nickname) => connection()
  .then((db) => db.collection('users').updateOne(
    { _id: id },
    { $set: { nickname } },
  ));

const remove = async (id) => {
  await connection()
    .then((db) => db.collection('users').deleteOne({ _id: id }));
};

module.exports = {
  create,
  remove,
  getAll,
  update,
};
