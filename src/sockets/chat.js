const getFormatedDate = require('../utils/getFormatedDate');
const Messages = require('../models/Messages');

module.exports = (io) => io.on('connection', (socket) => {
    socket.on('newConnection', async () => {
      const history = await Messages.getMessages();
      socket.emit('sendHistory', history);
      io.emit('userConnected');
    });
    socket.on('disconnect', async () => {
      io.emit('userDisconnected');
    });
    socket.on('change', async () => {
      io.emit('userChanged');
    });
    socket.on('sendMessage', async ({ nickname, chatMessage }) => {
      const date = getFormatedDate();
      const message = `(${date}) ${nickname}: ${chatMessage}`;
      await Messages.insertOne({ message: chatMessage, nickname, timestamp: date });
      io.emit('newMessage', message);
    });
  });