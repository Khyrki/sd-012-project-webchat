module.exports = (io, socket, users) => {
  socket.on('setNickname', (newNickname) => {
    const usersToEdit = users;
    usersToEdit[socket.id] = newNickname;
    io.emit('setUsers', users);
  });
};
