const usersList = [];

const userConnection = (io) => {
  io.on('connection', async (socket) => {
    socket.on('user', (user) => {
      usersList.push({ nickname: user, id: socket.id });
      io.emit('user', usersList);
    });

    socket.on('userUpdate', (updatedUser) => {
      usersList.forEach((user, index) => {
        if (user.id === socket.id) usersList[index].nickname = updatedUser;
        io.emit('user', usersList);
      });
    });

    socket.on('disconnect', () => {
      const remove = usersList.findIndex(({ id }) => id === socket.id);
      usersList.splice(remove, 1);
      io.emit('user', usersList);
    });
  });
};

module.exports = userConnection;
