module.exports = (io, socket, users) => {
  const nickname = socket.id.substring(0, 16);
  users.push({ id: socket.id, nickname });
  socket.emit('setUser', nickname);
  io.emit('setUsers', users);
};
