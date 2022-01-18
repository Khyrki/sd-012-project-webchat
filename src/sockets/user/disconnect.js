module.exports = (socket, users) => {
  socket.on('disconnect', () => {
    const usersToEdit = users;
    delete usersToEdit[socket.id];
    socket.broadcast.emit('setUsers', users);
  });
};
