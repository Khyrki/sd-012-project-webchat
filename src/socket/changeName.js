const { CHANGE_NAME, NICKNAME, USER_LIST } = require('./events');

const changeName = (io, socket, session) => {
  socket.on(CHANGE_NAME, (user) => {
    const { oldName, newName } = JSON.parse(user);
    session.changeName(oldName, newName);
    socket.emit(NICKNAME, newName);
    io.emit(USER_LIST, JSON.stringify(session.getUserList()));
  });
};

module.exports = changeName;