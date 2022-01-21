const { formatMessage } = require('../controllers');
const { loadMessages } = require('../controllers');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const rightMessage = formatMessage(message);
    io.emit('message', rightMessage);
  });
  socket.on('loadChat', async () => {
    const messages = await loadMessages();
    messages.forEach((message) => {
      socket.emit('loadMessages', message);
    });
  });
});