const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('Boas-vindas!', 'Que bom que você aqui!');

    socket.on('message', ({ chatMessage, nickname }) => {
      const dateString = moment().format('DD-MM-YYYY HH:MM:SS A');
      io.emit('message', `${dateString} - ${nickname}: ${chatMessage}`);
    });
  });
};
