const onlineUsers = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('newUser');
  socket.on('newUser', (nickname) => {
    socket.emit('updateUsers', onlineUsers);
    onlineUsers.push({ nickname, id: socket.id });
    socket.broadcast.emit('updateUsers', onlineUsers);
  });

  // código inspirado e feito com ajuda do Matheus Tkaczyk.
  socket.on('nicknameChange', (newNickname) => {
    onlineUsers.forEach((user, index) => {
      if (user.id === socket.id) onlineUsers[index].nickname = newNickname;
      socket.broadcast.emit('updateUsers', onlineUsers);
    });
  });

  socket.on('disconnect', () => {
    const remove = onlineUsers.findIndex(({ id }) => id === socket.id);
    onlineUsers.splice(remove, 1);
    socket.broadcast.emit('updateUsers', onlineUsers);
  });
});