const connection = require('../connection');

const create = async (obj) => (await connection())
.collection('messages').insertOne(obj);

module.exports = create;
