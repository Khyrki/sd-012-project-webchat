const { createMessage } = require('../../models/chat');

module.exports = (io, socket) => {
  socket.on('message', async (message) => {
    // await createMessage(message);
    socket.broadcast.emit('message', message);
  });
};