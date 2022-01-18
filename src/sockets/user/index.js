const setUser = require('./setUser');
const setNickname = require('./setNickname');
const disconnect = require('./disconnect');

const users = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} connect`);

    setUser(io, socket, users);
    setNickname(io, socket, users);
    disconnect(socket, users);
  });
};
