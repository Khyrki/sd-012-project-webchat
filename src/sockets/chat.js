const moment = require('moment');

const messages = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');
    const fotmatMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
    console.log(`Mensagem: ${fotmatMessage}`);
    io.emit('message', fotmatMessage);
  });
};

// const randomUser = (socket, io) => {
//   const { id } = socket;
//   console.log(`Usuário conectado ID: ${id}`);
//   const formatUser = `Gost-${id.slice(9)}`;
//   console.log(formatUser);
//   io.emit('randomUser', formatUser);
// };

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  console.log(`Usuário conectado ID: ${id}`);
  const formatUser = `Gost-${id.slice(9)}`;
  console.log(formatUser);
  io.emit('randomUser', formatUser);
  // randomUser(socket, io);
  messages(socket, io);
});