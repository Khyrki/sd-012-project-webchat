const getDateTime = require('../helpers/getDateTime');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Nova conexão com ${socket.id}!`);

    socket.on('disconnect', () => {
      console.log(`Um usuário desconectou em ${socket.id}.`);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      const dateTime = getDateTime();

      const formattedMsg = `${dateTime} ${nickname}: ${chatMessage}`;
      console.log(formattedMsg);
      io.emit('message', formattedMsg);
    });
  });
};
