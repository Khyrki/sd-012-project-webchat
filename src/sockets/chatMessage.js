const formatDate = require('../helpers/dateFormat');

const { postMessages, getMessages } = require('../models/webChat');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const loadedMessages = await getMessages();
    socket.emit('loadMessages', loadedMessages);

    socket.on('message', async (message) => {
      io.emit('message', `${formatDate()} - ${message.nickname}: ${message.chatMessage}`);

      await postMessages(message.chatMessage, message.nickname, formatDate());
    });
  });
};
