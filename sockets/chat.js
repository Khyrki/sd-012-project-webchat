const { format } = require('date-fns');
const { randomName } = require('../randomNickName');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`O cliente ${socket.id} está conectado!`);

    socket.emit('randomName', `${randomName()}`);
    
    socket.on('nickName', (nickName) => {
      socket.emit('newNickName', nickName);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      const currentDate = new Date();
      const date = format(currentDate, 'dd-MM-yyyy HH:mm:ss');
      const message = `${date} - ${nickname}: ${chatMessage}`;
      io.emit('message', message);
    });
  });
};