const getFormatedDate = require('../utils/getFormatedDate');
const Messages = require('../models/Messages');

module.exports = (io) => io.on('connection', (socket) => {
    socket.on('getHistory', async () => {
      const history = await Messages.getMessages();
      io.emit('sendHistory', history);
    });
    socket.on('sendMessage', async ({ nickname, chatMessage }) => {
      const date = getFormatedDate();
      const message = `(${date}) ${nickname}: ${chatMessage}`;
      await Messages.insertOne({ message: chatMessage, nickname, timestamp: date });
      io.emit('newMessage', message);
    });
  });