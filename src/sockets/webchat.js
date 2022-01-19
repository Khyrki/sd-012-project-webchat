const { formatDate } = require('../helpers');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ nickname = 'Anonymous', chatMessage }) => {
    const date = new Date().toLocaleString();
    const formattedDate = formatDate(date);
    io.emit('message', `${formattedDate} - ${nickname}: ${chatMessage}`);
  });

  socket.on('nickname', (nickname = socket.id.slice(0, 16)) => {
    io.emit('serverNickname', nickname);
  });
});