const handleDate = require('../helpers/handleDate');
const { saveMessage } = require('../models/saveMessage');

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('newConnection', socket.id);

  socket.on('disconnect', () => {
    console.log('userDisconnected', `O usuário ${socket.id} saiu da conversa!`);
  });

  socket.on('message', ({ chatMessage, nickName }) => {
    const date = new Date();
    const treatedDate = handleDate(date);
    saveMessage({ chatMessage, nickName, treatedDate });
    io.emit('message', `${treatedDate} ${nickName} >> ${chatMessage}`);
  });
});