const moment = require('moment');

module.exports = (io) => {
    io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = new Date();
      const formatDate = moment(date).format('DD-MM-yyyy HH:MM:SS A');
      io.emit('message', `${formatDate} - ${nickname}: ${chatMessage}`);
    });
  });
}; 