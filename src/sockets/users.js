const crypto = require('crypto');

let onlineUsers = [];

const filterDisconnect = (socketId) => {
  const updatedOnline = onlineUsers.filter(({ id }) => socketId !== id);

  onlineUsers = updatedOnline;
};

module.exports = async (io) => {
  io.on('connection', (socket) => {
    socket.on('user', () => {
      const nickname = crypto.randomBytes(8).toString('hex');
      onlineUsers.push({ nickname, id: socket.id });
      io.emit('user', { nickname, onlineUsers });
    });
    socket.on('changeName', ({ id, newNick }) => {
      onlineUsers.forEach(({ id: userId }, i) => {
        if (userId === id) onlineUsers[i].nickname = newNick;
        
        return false;
      });
      io.emit('user', { nickname: newNick, onlineUsers });
    });

    socket.on('disconnect', () => {
      filterDisconnect(socket.id);
      io.emit('disconnectUser', onlineUsers);
    });
  });
};