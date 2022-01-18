const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date();
    
    const dateStringWithTime = moment(date).format('DD-MM-YYYY HH:MM:SS A');

    io.emit('message', `${dateStringWithTime} - ${nickname}: ${chatMessage}`);
  });
});
