module.exports = (io, socket, nickname, onlineUsers) => {
  if (onlineUsers.length > 0) {
    const foundUser = onlineUsers.find((user) => user.id === socket.id);
    if (!foundUser) {
      onlineUsers.push({ id: socket.id, nickname });
    } else {
      const userIndex = onlineUsers.indexOf(foundUser);
      onlineUsers.splice(userIndex, 1, { id: socket.id, nickname });
    }
  } else {
    onlineUsers.push({ id: socket.id, nickname });
  }
  io.emit('onlineUsers', onlineUsers);
};
