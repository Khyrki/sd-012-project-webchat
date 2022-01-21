const getDateTime = require('../helpers/getDateTime');
const randomNickname = require('../helpers/randomNickname');
const saveMessages = require('../models/insertMessages');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Nova conexão com ${socket.id}!`);

    socket.on('disconnect', () => {
      console.log(`Um usuário desconectou em ${socket.id}.`);
    });

    socket.on('message', async ({ chatMessage, nickname }) => {
      const dateTime = getDateTime();
      await saveMessages(dateTime, chatMessage, nickname);
      const formattedMsg = `${dateTime} ${nickname}: ${chatMessage}`;
      io.emit('message', formattedMsg);
    });

    socket.on('newUser', () => {
      const nickname = randomNickname(16);
      io.emit('newUser', nickname);
    });
  });
};
