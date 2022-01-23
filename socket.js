const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('newUser');

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-YYYY HH:MM:SS A');
    const message = `${date} - ${nickname}: ${chatMessage}`;

    io.emit('clientMessage', message);
  });
});