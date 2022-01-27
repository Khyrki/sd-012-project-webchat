const newId = require('../../helpers/newId');

let onlineUsers = [];

module.exports = (io, socket) => {
  const nicknameId = newId();
  console.log('Online Users [Antes do push]:', { onlineUsers });

  onlineUsers.splice(0, 0, { id: socket.id, nickname: nicknameId });

  console.log('Online Users [Depois do push]:', { onlineUsers });

  io.emit('setOnlineUsers', onlineUsers);

  socket.on('setNickname', ({ id, nickname }) => {
    onlineUsers = onlineUsers.map((user) => {
      if (user.id === id) {
        return { id, nickname };
      }
      return user;
    });

    io.emit('setOnlineUsers', onlineUsers);
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    io.emit('setOnlineUsers', onlineUsers);
  });
};