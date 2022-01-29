const { createMsg, getMsgs } = require('../models');
const { formattedTime } = require('../helpers');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const loadedMessages = await getMsgs();
    socket.emit('loadMessages', loadedMessages);

    socket.on('message', async (message) => {
      io.emit('message', `${formattedTime()} - ${message.nickname}: ${message.chatMessage}`);
      await createMsg(message.chatMessage, message.nickname, formattedTime());
    });
  });
};
