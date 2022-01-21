const { format } = require('date-fns');
const randomName = require('../randomNickName');
const { createMessagesHistory } = require('../models');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log(`O cliente ${socket.id} está conectado!`);

    socket.emit('randomName', `${randomName()}`);
    
    socket.on('nickName', (nickName) => {
      socket.emit('newNickName', nickName);
    });

    socket.on('message', async ({ chatMessage, nickname }) => {
      const currentDate = new Date();
      const date = format(currentDate, 'dd-MM-yyyy HH:mm:ss');
      const message = `${date} - ${nickname}: ${chatMessage}`;

      await createMessagesHistory(chatMessage, nickname, date);

      io.emit('message', message);
    });
  });
};