const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment().format('DD/MM/YYYY HH:mm:ss');
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
});
