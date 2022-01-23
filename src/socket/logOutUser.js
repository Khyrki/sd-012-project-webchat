const { USER_LIST, DISCONNECT } = require('./events');

const logOutUser = (io, socket, session) => {
  socket.on(DISCONNECT, () => {
    session.removeUser(socket.id);
    io.emit(USER_LIST, JSON.stringify(session.getUserList()));
  });
};

module.exports = logOutUser;