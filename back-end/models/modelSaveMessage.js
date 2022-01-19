// const { ObjectId } = require('mongodb');

const connection = require('./connection');

const saveMessage = async (nickname, message, timestamp) => {
    await connection()
        .then((db) => db.collection('messages').insertOne({ nickname, message, timestamp }));
    return `${timestamp} - ${nickname}: ${message}`;
};

const controllerGetMessageAll = async () => {
    const messages = await connection()
        .then((db) => db.collection('messages').find().toArray());
    return messages;
};

module.exports = { saveMessage, controllerGetMessageAll };
