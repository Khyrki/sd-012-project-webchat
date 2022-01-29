const formatDate = require('../helpers/dateFormat');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.on('message', async (message) => {
      io.emit('message', `${formatDate()} - ${message.nickname}: ${message.chatMessage}`);
    });
  });
};
