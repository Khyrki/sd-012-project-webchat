const setUser = require('./setUser');
const setNickname = require('./setNickname');

let users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} connect`);

    setUser(io, socket, users);
    setNickname(io, socket, users);

    socket.on('disconnect', () => {
      users = users.filter((user) => user.id !== socket.id);
      socket.broadcast.emit('setUsers', users);
    });
  });
};
