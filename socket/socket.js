const usersName = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('user', (nick) => {
    usersName.push(nick);
    io.emit('usersList', usersName);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString('pt-BR').replace(/\//g, '-');
    io.emit('message', `${date} ${nickname}: ${chatMessage}`);
  });
});