module.exports = (io, socket, onlineUsers) => {
  const foundUser = onlineUsers.find((user) => user.id === socket.id);
  const userIndex = onlineUsers.indexOf(foundUser);

  onlineUsers.splice(userIndex, 1);

  io.emit('onlineUsers', onlineUsers);
};
