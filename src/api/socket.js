const onlineUsers = [];

const updateUserNickname = (io, socket) => {
  socket.on('nickname', (userInput) => {
    onlineUsers.forEach((user, index) => {
      if (user.id === socket.id) {
        onlineUsers[index].nickname = userInput;
      }
    });
    io.emit('connection', onlineUsers);
  });
}; 

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Conexão com o client ${socket.id} foi estabelecida!`);

  const client = {
    nickname: `user-${socket.id}`,
    id: socket.id,
  };

  onlineUsers.push(client);

  updateUserNickname(io, socket);

  socket.on('disconnect', () => {
    onlineUsers.forEach(({ id }, index) => {
      if (socket.id === id) {
        onlineUsers.splice(index, 1);
      }
    });
    io.emit('connection', onlineUsers);
  });

  io.emit('connection', onlineUsers);
});