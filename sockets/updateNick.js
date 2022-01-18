module.exports = (io, socket, onlineUsers) => {
  socket.on('updateNick', (nickname) => {
    const user = onlineUsers.find(({ id }) => id === socket.id);
    user.nickname = nickname;
    io.emit('onlineUsers', onlineUsers);
  });
};
