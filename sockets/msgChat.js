module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ message, nickname }) => {

    io.emit('message',);
  });
});