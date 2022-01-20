let users = [];

module.exports = (io) => io.on('connection', (socket) => {
  const socketId = socket.id.substring(0, 16);
  socket.emit('newConnection', socketId);
  
  users.push({ id: socketId, name: '' });
  console.log(users);

  io.emit('usersOnline', users);

  socket.on('disconnect', () => {
    const userId = socket.id.substring(0, 16);
    users = users.filter(({ id }) => id !== userId);
    socket.broadcast.emit('usersOnline', users);
  });

  socket.on('updateUserNickname', ({ currentNickname, newNickname }) => {
    users = users.map((user) => {
      if (user.id === currentNickname) { return { ...user, name: newNickname }; }
      return user;
    });
    console.log(users);
    io.emit('usersOnline', users);
  });
});