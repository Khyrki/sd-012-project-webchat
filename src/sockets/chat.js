const randomNick = require('../helpers/randomNick');
const { loadMessages } = require('../controllers');

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  socket.on('joinRoom', async () => {
    const nickname = randomNick(16);
    io.emit('createUser', { id, nickname });
    await loadMessages();
  });
  socket.on('clientMessage', (message) => {
    io.emit('serverMessage', { id, message });
  });
  socket.on('clientUser', (nickname) => {
    io.emit('createUser', { id, nickname });
  });
  socket.on('saveMessage', (messageInfo) => {
    io.emit('messageUpload', messageInfo);
  });
  socket.on('disconnect', () => {
    io.emit('deleteUser', id);
  });
});