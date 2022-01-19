const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timeInMs = moment().format('DD-MM-YYYY HH:MM:SS A');

    io.emit('message', `${timeInMs} - ${nickname} ${chatMessage}`);
  });
});