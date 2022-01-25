const { format } = require('date-fns');

module.exports = (io) => io.on('connection', async (socket) => {
  socket.emit('nickname', `${socket.id.slice(0, 16)}`);
  
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    console.log(`Mensagen - ${nickname}: ${chatMessage}`);
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
});
