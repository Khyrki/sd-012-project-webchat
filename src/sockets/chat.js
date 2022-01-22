const { serializeMsg, serializeDate } = require('../utils');
const { storeMessage, getMessages } = require('../models');

module.exports = async (io, socket) => {
  const messagesHistory = await getMessages();
  console.log(messagesHistory);
  
  socket.emit('history', messagesHistory);

  socket.on('message', ({ chatMessage, nickname, date }) => {
    const serializedDate = serializeDate(date);
    const serializedMsg = serializeMsg(chatMessage, nickname, serializedDate);
    storeMessage({ message: chatMessage, nickname, timestamp: serializedDate });
    io.emit('message', serializedMsg);
  });
};