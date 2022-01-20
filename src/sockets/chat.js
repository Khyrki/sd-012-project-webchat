const { saveMessage } = require('../controllers');

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  socket.on('clientMessage', (message) => {
    io.emit('serverMessage', { id, message });
  });
  socket.on('saveMessage', (messageInfo) => {
    saveMessage(messageInfo);
  });
});