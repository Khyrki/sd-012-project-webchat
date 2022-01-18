module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const time = new Date();

    io.emit('message',
      `${time.toLocaleString('es-CL', { timeZone: 'UTC' })} ${nickname} ${chatMessage}`);
  });
});