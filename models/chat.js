const connection = require('./connection');

const receiveFromDB = async () => {
  const db = await connection();
  const receive = await db.collection('messages').find().toArray();
  return receive;
};
const sendToDB = async ({ dataTime, nickname, chatMessage }) => {
  const db = await connection();
  const send = await db.collection('messages').insertOne({ dataTime, nickname, chatMessage });
  return send;
};
module.exports = {
  receiveFromDB,
  sendToDB,
};
