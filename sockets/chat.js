const getTime = require('../utils/getTime');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const { data, hour } = getTime();
    io.emit('message', `${data} ${hour} - ${nickname}: ${chatMessage}`);
  });
});