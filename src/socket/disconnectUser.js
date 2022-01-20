const { USER_LIST, DISCONNECT } = require('./events');

const disconnectUser = (io, socket, session) => {
  socket.on(DISCONNECT, () => {
    session.removeUser(socket.id);
    io.emit(USER_LIST, JSON.stringify(session.getUserList()));
  });
};

module.exports = disconnectUser;
