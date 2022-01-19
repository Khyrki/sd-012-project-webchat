const moment = require('moment');

function handleMessage(io, socket) {
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateAndTime = moment().format('DD-MM-yyyy  HH:mm:ss');
    const detailedMessage = `${dateAndTime} - ${nickname}: ${chatMessage}`;
    io.emit('message', detailedMessage);
  });
}

module.exports = (io) => io.on('connection', (socket) => {
  handleMessage(io, socket);
});
