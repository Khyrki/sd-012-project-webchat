const formattedDate = require('../helper/formattedDate');
const { getMessages, postMessages } = require('../models/webchat');

module.exports = (io) => io.on('connection', async (socket) => {
  socket.on('message', async (message) => {
    const formattedMsg = `${formattedDate()} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', formattedMsg);

    await postMessages(message.chatMessage, message.nickname, formattedDate());
  });

  socket.on('loadMessages', async () => {
    const loadedMessages = await getMessages();
    socket.emit('loadMessages', loadedMessages);
  });
});
