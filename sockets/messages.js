const handleDate = require('../helpers/handleDate');
const { saveMessage } = require('../models');

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('newConnection', socket.id);

  socket.on('disconnect', () => {
    console.log('userDisconnected', `O usuário ${socket.id} saiu da conversa!`);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = new Date();
    const timestamp = handleDate(date);
    await saveMessage({ chatMessage, nickname, timestamp });
    io.emit('message', `${timestamp} ${nickname} >> ${chatMessage}`);
  });
});