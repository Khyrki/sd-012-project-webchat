const randomNickname = require('../helpers/randomNickname');

module.exports = (io) => {
  let userList = [];
  io.on('connection', (socket) => { 
    socket.on('newUser', () => {
      const nickname = randomNickname(16);
      userList.push({ socketId: socket.id, nickname });
      socket.emit('specificUserUpdate', ({ nickname, userList }));
      socket.broadcast.emit('newUser', ({ nickname, userList }));
    });

    socket.on('nicknameChange', ({ newName }) => {
      const userIndex = userList.findIndex((user) => user.socketId === socket.id);
      userList[userIndex].nickname = newName;
      io.emit('refreshUsers', (userList));
    });
    
    socket.on('disconnect', () => {
      const updatedUserList = userList.filter((user) => socket.id !== user.socketId);
      userList = updatedUserList;
      io.emit('userDisconnect', (userList));
    });
  });
};
