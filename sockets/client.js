const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {

  });
});
