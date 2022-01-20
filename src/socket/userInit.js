const { NICKNAME, USER_LIST } = require('./events');

const randomNick = (id) => id.slice(0, 16);

const userInit = (io, socket, session) => {
  const nick = randomNick(socket.id);
  session.addUser({ id: socket.id, nick });
  socket.emit(NICKNAME, nick);
  io.emit(USER_LIST, JSON.stringify(session.getUserList()));
};

module.exports = userInit;
