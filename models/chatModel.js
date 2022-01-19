const connection = require('./connection');

const createMessages = async ({ message, nickname, timeStamp }) => {
    await connection()
    .then((db) => db.collection('messages').insertOne({ message, nickname, timeStamp }));    
};

const getAllMessages = async () => {
    const allMessages = await connection()
    .then((db) => db.collection('messages').find().toArray());
    return allMessages;
};

module.exports = { createMessages, getAllMessages };