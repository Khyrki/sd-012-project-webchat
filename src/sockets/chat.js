const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} conectado`);
    io.emit('connection', 'Bem-vindo ao chat da Uol');
    const newNick = socket.id.substring(0, 16);

    socket.emit('randonNick', newNick);

    socket.on('nickname', (nickname) => {
      socket.emit('newNickname', nickname);
    });

    socket.on('changeNick', (nick) => {
      console.log(nick);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
      const userMessage = `${timestamp} - ${nickname}: ${chatMessage}`;

      io.emit('message', userMessage);
    });
  });
};