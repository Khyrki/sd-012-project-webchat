const { genRandomString } = require('../utils/index');

let connectedUsers = [];

module.exports = (io, socket) => {
  const randomNick = genRandomString();
  connectedUsers.push({ id: socket.id, nickname: randomNick });
  socket.emit('storeNickname', randomNick);

  io.emit('updateConnectedUsers', connectedUsers);

  socket.on('changeNickname', (nickname) => {
    const userIndex = connectedUsers.findIndex(({ id }) => id === socket.id);
    connectedUsers[userIndex].nickname = nickname;
    io.emit('updateConnectedUsers', connectedUsers);
  });

  socket.on('disconnect', () => {
    connectedUsers = connectedUsers.filter(({ id }) => id !== socket.id);
    io.emit('updateConnectedUsers', connectedUsers);
    console.log(`Usuário ${socket.id} desconectado`);
  });
};