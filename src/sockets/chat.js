const { serializeMsg } = require('../utils');

const messages = (io, socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const serializedMsg = serializeMsg(chatMessage, nickname, new Date());
    io.emit('message', serializedMsg);
  });
};

module.exports = (io, socket) => {
  messages(io, socket);
};