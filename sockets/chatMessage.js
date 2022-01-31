const formatDate = require('./helpers/formatDate');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      const formatedDate = formatDate(msg.date);
      io.emit('message', `${formatedDate} - ${msg.nickname}: ${msg.chatMessage}`);
    });
  });
};