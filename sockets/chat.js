const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  const timeStamp = moment().format('DD-MM-yyyy HH:mm:ss');

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${timeStamp} - ${nickname}: ${chatMessage}`);
  });
});