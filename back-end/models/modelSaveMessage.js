// const { ObjectId } = require('mongodb');

const connection = require('./connection');

const saveMessage = async (nickname, message, timestamp) => {
    await connection()
        .then((db) => db.collection('messages').insertOne({ nickname, message, timestamp }));
    return `${timestamp} - ${nickname}: ${message}`;
};

module.exports = { saveMessage };