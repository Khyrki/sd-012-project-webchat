const randomNick = require('../helpers/randomNick');
const { loadMessages } = require('../controllers');

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  socket.on('joinRoom', async () => {
    const nickname = randomNick(16);
    io.emit('createUser', { id, nickname });
    const messages = await loadMessages();
    messages.forEach((message) => {
      socket.emit('loadMessages', message);
    });
  });
  socket.on('clientUser', (nickname) => {
    io.emit('createUser', { id, nickname });
  });
  socket.on('disconnect', () => {
    io.emit('deleteUser', id);
  });
});