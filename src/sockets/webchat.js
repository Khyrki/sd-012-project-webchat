module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ nickname = 'Anonymous', chatMessage }) => {
    const date = new Date().toLocaleString();
    io.emit('serverMsg', { date, nickname, chatMessage });
  });

  socket.on('nickname', (nickname) => {
    io.emit('serverNickname', nickname);
  });
});