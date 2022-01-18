module.exports = (socket, users) => {
  socket.on('disconnect', () => {
    const userIndex = users.findIndex(({ id }) => id === socket.id);
    users.splice(userIndex, 1);
    socket.broadcast.emit('updatedUsers', users);
  });
};
