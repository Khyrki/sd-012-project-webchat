const randomNickname = require('../helpers/randomNickname');

let userList = [];

const handleNewUser = (socket) => {
  socket.on('newUser', () => {
    const nickname = randomNickname(16);
    userList.push({ socketId: socket.id, nickname });
    socket.emit('specificUserUpdate', ({ nickname, userList }));
    socket.broadcast.emit('newUser', ({ nickname, userList }));
  });
};

const handleNicknameChange = (socket, io) => {
  socket.on('nicknameChange', ({ newName }) => {
    const userIndex = userList.findIndex((user) => user.socketId === socket.id);
    userList[userIndex].nickname = newName;
    io.emit('refreshUsers', (userList));
  });
};

const handleDisconnect = (socket, io) => {
  socket.on('disconnect', () => {
    const updatedUserList = userList.filter((user) => socket.id !== user.socketId);
    userList = updatedUserList;
    io.emit('userDisconnect', (userList));
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => { 
    handleNewUser(socket);
    handleNicknameChange(socket, io);
    handleDisconnect(socket, io);
  });
};
