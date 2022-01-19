const nicks = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('user', (nick) => {
    nicks.push(nick);
    io.emit('usersList', nicks);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString().replace('/', '-');
    io.emit('message', `${date.replace('/', '-')} ${nickname}: ${chatMessage}`);
  });
});
