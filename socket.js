const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const time = moment().format('DD-MM-YYYY HH:MM:SS A');
    const msg = `${time} - ${nickname}: ${chatMessage}`;

    io.emit('message', msg);
  });
});
