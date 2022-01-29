const getFormatedDate = require('../utils/getFormatedDate');
const Messages = require('../models/Messages');

module.exports = (io) => io.on('connection', (socket) => {
    socket.on('newConnection', async () => {
      const history = await Messages.getMessages();
      socket.emit('sendHistory', history);
      io.emit('userConnected');
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      io.emit('userDisconnected');
    });
    socket.on('change', () => {
      io.emit('userChanged');
    });
    socket.on('message', async (message) => {
      const { nickname, chatMessage } = message;
      const date = getFormatedDate();
      const formatedMessage = `(${date}) ${nickname}: ${chatMessage}`;
      await Messages.insertOne({ message: chatMessage, nickname, timestamp: date });
      io.emit('message', formatedMessage);
    });
  });