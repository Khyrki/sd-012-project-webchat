const onlineTalkers = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.on('user', (user) => {
      onlineTalkers.push({ nickname: user, id: socket.id });
      io.emit('user', onlineTalkers);
    });

    socket.on('updateNickname', (updatedNickname) => {
      onlineTalkers.forEach((user, index) => {
        if (user.id === socket.id) onlineTalkers[index].nickname = updatedNickname;
        io.emit('user', onlineTalkers);
      });
    });

    socket.on('disconnect', () => {
      const remove = onlineTalkers.findIndex(({ id }) => id === socket.id);
      onlineTalkers.splice(remove, 1);
      io.emit('user', onlineTalkers);
    });
  });
};