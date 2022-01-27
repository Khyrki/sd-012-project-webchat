const newId = require('../../helpers/newId');

module.exports = (io, socket) => {
  const nicknameId = newId();
  
  io.emit('userConnect', { id: socket.id, nickname: nicknameId });

  socket.on('setNickname', ({ id, nickname }) => {
    io.emit('setNickname', { id, nickname });
  });

  socket.on('disconnect', () => {
    io.emit('userDisconnect', socket.id);
  });
};