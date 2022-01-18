const { gettingDateAndTime } = require('../utils/functions');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Uma pessoa com id: ${socket.id} se conectou.`);
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = gettingDateAndTime();
      const message = `${date} ${nickname}: ${chatMessage}`;
      io.emit('message', message);
    });
  });
};
