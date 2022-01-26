const connection = require('./connection');

module.exports = async () => {
  const db = await connection();

  const allData = await db.collection('messages').find().toArray();

  const formattedMessages = allData.map((data) => (
    `${data.timestamp} - ${data.message.nickname}: ${data.message.chatMessage}`
  ));

  return formattedMessages;
};
