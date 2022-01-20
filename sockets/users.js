let users = [];

module.exports = (io) => io.on('connection', (socket) => {
  const socketId = socket.id.substring(0, 16);
  socket.emit('newConnection', socketId);

  users.push(socketId);

  io.emit('usersOnline', users);

  socket.on('disconnect', () => {
    const userId = socket.id.substring(0, 16);
    users = users.filter((user) => user !== userId);
    socket.broadcast.emit('usersOnline', users);
  });

  socket.on('updateUserNickname', ({ key, userNickname }) => {
    users = users.reduce((acc, crr) => (crr === key ? [...acc, userNickname] : [...acc, crr]), []);
    io.emit('usersOnline', users);
  });
});