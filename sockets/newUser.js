module.exports = (io, socket, onlineUsers) => {
  socket.on('newUser', (nickname) => {
    onlineUsers.push({ id: socket.id, nickname });
    io.emit('onlineUsers', onlineUsers);
  });
};
