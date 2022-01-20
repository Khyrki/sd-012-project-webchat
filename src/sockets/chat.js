const formattedDate = require('../helper/formattedDate');
const randomNick = require('../helper/randomNick');
const { getMessages, postMessages } = require('../models/webchat');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`User logged: ${socket.id}`);

  socket.on('message', async (message) => {
    const formattedMsg = `${formattedDate()} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', formattedMsg);

    await postMessages(message.chatMessage, message.nickname, formattedDate());
  });

  socket.on('user', () => {
    io.emit('user', randomNick());
  });

  socket.on('loadMessages', async () => {
    const loadedMessages = await getMessages();
    io.emit('loadMessages', loadedMessages);
  });
});
