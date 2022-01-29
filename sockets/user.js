const users = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.on('user', (user) => {
      users.push({ nickname: user, id: socket.id });
      io.emit('user', users);
    });

    socket.on('userUpdate', (updatedUser) => {
      users.forEach((user, index) => {
        if (user.id === socket.id) users[index].nickname = updatedUser;
        io.emit('user', users);
      });
    });

    socket.on('disconnect', () => {
      const remove = users.findIndex(({ id }) => id === socket.id);
      users.splice(remove, 1);
      io.emit('user', users);
    });
  });
};