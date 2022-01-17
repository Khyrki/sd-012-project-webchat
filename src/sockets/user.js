let users = [];

const setUser = (io, socket) => {
  const nickname = socket.id.substring(0, 16);
  users.push({ id: socket.id, nickname });
  socket.emit('setUser', nickname);
  io.emit('setUsers', users);
};

const setNickname = (io, socket, newNickname) => {
  users.forEach((user) => {
    const userToEdit = user;
    if (userToEdit.id === socket.id) {
      userToEdit.nickname = newNickname;
      io.emit('setUsers', users);
    }
  });
};

const disconnectUser = (socket) => {
  users = users.filter((user) => user.id !== socket.id);
  socket.broadcast.emit('setUsers', users);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} connect`);
    setUser(io, socket);
    socket.on('setNickname', (newNickname) => {
      setNickname(io, socket, newNickname);
    });
    socket.on('disconnect', () => {
      disconnectUser(socket);
    });
  });
};
