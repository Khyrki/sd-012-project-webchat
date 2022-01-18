const moment = require('moment');
const { geradorNome } = require('gerador-nome');

module.exports = (io) => io.on('connection', (socket) => {
    socket.emit('nick', geradorNome);

  socket.on('message', ({ chatMessage, nickname }) => {
    const timeInMs = moment().format('DD-MM-YYYY HH:MM:SS A');

    io.emit('message', `${timeInMs} - ${nickname} ${chatMessage}`);
  });
});