module.exports = (io, socket, users) => {
  socket.on('setNickname', (newNickname) => {
    users.forEach((user) => {
      const userToEdit = user;
      if (userToEdit.id === socket.id) {
        userToEdit.nickname = newNickname;
        io.emit('setUsers', users);
      }
    });
  });
};
