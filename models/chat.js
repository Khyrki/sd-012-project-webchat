const connection = require('./connection');

const registerMessage = async (body) => {
    const resultado = await connection()
    .then((db) => db.collection('messages').insertOne(body));
    
    return resultado.ops[0];
};

const getAll = async () => {
  const list = await connection()
  .then((db) => db.collection('messages').find().toArray())
  .then((result) => result);
  return list;
};
module.exports = { 
  registerMessage,
  getAll,
};