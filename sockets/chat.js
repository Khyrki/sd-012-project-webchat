const modelMessage = require('../models/message');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const messageFormat = modelMessage(chatMessage, nickname);
    io.emit('message', messageFormat);
  });
});