const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`O cliente ${socket.id} está conectado`);

    socket.on('message', ({ chatMessage, nickname }) => {
      const dateNow = moment().format('DD-MM-YYYY hh:mm:ss A');
      const message = `${dateNow} - ${nickname} ${chatMessage}`;
      io.emit('message', message);
    });
  });
};
