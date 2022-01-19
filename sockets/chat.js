const getDateTime = require('../helpers/getDateTime');
const randomNickname = require('../helpers/randomNickname');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Nova conexão com ${socket.id}!`);

    socket.on('disconnect', () => {
      console.log(`Um usuário desconectou em ${socket.id}.`);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      const dateTime = getDateTime();

      const formattedMsg = `${dateTime} ${nickname}: ${chatMessage}`;
      io.emit('message', formattedMsg);
    });

    socket.on('newUser', () => {
      const nickname = randomNickname(16);
      io.emit('newUser', nickname);
    });
  });
};
