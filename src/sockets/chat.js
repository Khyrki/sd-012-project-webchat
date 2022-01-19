const moment = require('moment');

const messages = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');
    const fotmatMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
    console.log(`Mensagem: ${fotmatMessage}`);
    io.emit('message', fotmatMessage);
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado ID: ${socket.id}`);
  messages(socket, io);
});