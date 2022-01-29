const getFormatedDate = require('../utils/getFormatedDate');
const Messages = require('../models/Messages');

module.exports = (io) => io.on('connection', (socket) => {
    console.log(`User ${socket.id} is connected`);
    socket.on('sendMessage', async ({ nickname, chatMessage }) => {
      const date = getFormatedDate();
      const message = `(${date}) ${nickname}: ${chatMessage}`;
      await Messages.insertOne({ message: chatMessage, nickname, timestamp: date });
      io.emit('newMessage', message);
    });
  });