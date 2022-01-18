const handleDate = require('../helpers/handleDate');
const createMessage = require('../models/createMessage');

module.exports = (io) => io.on('connection', (socket) => {
  console.log('newUser', `O usuário ${socket.id} entrou na conversa!`);

  socket.on('disconnect', () => {
    console.log('userDisconnected', `O usuário ${socket.id} saiu da conversa!`);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date();
    const treatedDate = handleDate(date);
    createMessage('messages', { chatMessage, nickname, treatedDate });
    io.emit('message', `${treatedDate} ${nickname} >> ${chatMessage}`);
  });
});