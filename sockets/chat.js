const date = require('../helpers/date');

module.exports = (io, socket) => {
  const broadcastMessage = ({ chatMessage, nickname }) => {
    const message = `${date()} - ${nickname}: ${chatMessage}`;

    io.emit('message', message);
  };

  socket.on('message', broadcastMessage);
};