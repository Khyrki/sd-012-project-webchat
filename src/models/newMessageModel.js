const moment = require('moment');
const connection = require('./connection');

module.exports = async (message) => {
  const savedMessage = {
    message,
    timestamp: moment().format('DD-MM-YYYY hh:mm:ss A'),
  };

  const db = await connection();
  await db.collection('messages').insertOne(savedMessage);

  const { timestamp, message: { nickname, chatMessage } } = savedMessage;
  
  const formattedMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
  console.log(formattedMessage);
  return formattedMessage;
};