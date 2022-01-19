const moment = require('moment');

const dateTime = moment().format('DD-MM-YYYY HH:mm:ss');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`${socket.id} se conectou!`);
  socket.on('message', ({ chatMessage, nickname }) => {
    const message = `${dateTime} ${nickname}: ${chatMessage}`;

    io.emit('message', message);
  });
});