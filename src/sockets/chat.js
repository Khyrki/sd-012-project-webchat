const getFormatedDate = require('../utils/getFormatedDate');

module.exports = (io) => io.on('connection', (socket) => {
    console.log(`User ${socket.id} is connected`);
    socket.on('sendMessage', ({ nickname, chatMessage }) => {
      const date = getFormatedDate();
      const message = `(${date}) ${nickname}: ${chatMessage}`;
      io.emit('newMessage', message);
    });
  });