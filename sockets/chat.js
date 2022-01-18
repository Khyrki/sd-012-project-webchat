const { formatMessage } = require('../models/message');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const formattedMessage = formatMessage(chatMessage, nickname);
    io.emit('message', formattedMessage);
  });
});
