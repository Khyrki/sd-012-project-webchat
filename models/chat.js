const connection = require('./connection');

const registerMessage = async (body) => {
    const resultado = await connection()
    .then((db) => db.collection('messages').insertOne(body));
    console.log(resultado);
    return resultado.ops[0];
};

module.exports = { 
  registerMessage,
};