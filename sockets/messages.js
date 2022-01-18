module.exports = (io) => io.on('connection', (socket) => {
  console.log('newUser', `O usuário ${socket.id} entrou na conversa!`);

  socket.on('disconnect', () => {
    socket.broadcast.emit('userDisconnected', `O usuário ${socket.id} saiu da conversa!`);
  });

  socket.on('message', ({ chatMessage, nickname }) => {

  });
});