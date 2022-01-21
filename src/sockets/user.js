const randomNick = require('../helpers/randomNick');

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  socket.on('joinRoom', () => {
    const nickname = randomNick(16);
    io.emit('createUser', { id, nickname });
  });
  socket.on('loadUsers', (users) => {
    users.forEach((user) => {
      socket.emit('createUser', user);
    });
  });
  socket.on('clientUser', (nickname) => {
    io.emit('createUser', { id, nickname });
  });
  socket.on('disconnect', () => {
    io.emit('deleteUser', id);
  });
});