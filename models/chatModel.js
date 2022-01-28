const connection = require('./connection');

const sendMsg = async ({ time, nickname, chatMessage }) => {
    const db = await connection();
    const msgs = await db.collection('messages').insertOne({ time, nickname, chatMessage });
    return msgs;
};

const getAllMsgs = async () => {
    const db = await connection();
    const msgs = await db.collection('messages').find().toArray();
    return msgs;
};

module.exports = {
  getAllMsgs,
  sendMsg,
}; 
