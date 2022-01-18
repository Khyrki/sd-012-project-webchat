module.exports = (io, socket, users) => {
  const nickname = socket.id.substring(0, 16);
  const usersToEdit = users;
  usersToEdit[socket.id] = nickname;
  socket.emit('setUser', nickname);
  io.emit('setUsers', users);
};
