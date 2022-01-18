module.exports = (io, socket, onlineUsers) => {
  socket.on('disconnect', () => {
    const index = onlineUsers.findIndex(({ id }) => id === socket.id);
    onlineUsers.splice(index, index + 1);
    io.emit('onlineUsers', onlineUsers);
  });
};
