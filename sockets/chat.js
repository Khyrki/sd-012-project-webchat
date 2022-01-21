const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`O cliente ${socket.id} está conectado`);
    io.emit('nickname', socket.id.substring(0, 16));

    socket.on('nickname', (name) => {
      io.emit('serverNickname', { nickname: name });
    });
    
    socket.on('message', ({ chatMessage, nickname }) => {
      const dateNow = moment().format('DD-MM-YYYY hh:mm:ss A');
      const message = `${dateNow} - ${nickname} ${chatMessage}`;
      io.emit('message', message); // transmite para todo mundo
    });
  });
};
