const connection = require('./connection');

const createUser = async (_id, nickname) => {
    const connect = await connection();
    return connect.collection('users').insertOne({ _id, nickname });
};

module.exports = {
    createUser,
};
