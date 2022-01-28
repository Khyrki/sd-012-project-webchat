module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date();
    io.emit('message',
    `${date.getDate()}-0${date.getMonth() + 1}-${date
      .getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date
      .getSeconds()} - ${nickname}: ${chatMessage}`);
  });
});