const formatDate = require('./helpers/formatDate');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      io.emit('message', `${formatDate()} - ${msg.nickname}: ${msg.chatMessage}`);
    });
  });
};