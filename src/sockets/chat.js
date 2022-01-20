const moment = require('moment');

const users = [];

const messages = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');
    const fotmatMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
    console.log(`Mensagem: ${fotmatMessage}`);
    io.emit('message', fotmatMessage);
  });
};

const randomUser = (socket, io) => {
  const { id } = socket;
  console.log(`Usuário conectado ID: ${id}`);
  const formatUser = `Gost-${id.slice(9)}`;
  console.log(formatUser);
  users.push({ id, nickname: formatUser });
  io.emit('randomUser', formatUser);
};

const usersOnline = (socket, io) => {
  socket.on('usersOnCli', () => {
    io.emit('usersOnServ', users);
  });
};

const disconnectUser = (socket, io) => {
  socket.on('disconnect', () => {
    const user = users.findIndex((u) => u.id === socket.id);
    users.splice(user, 1);
    io.emit('usersOnServ', users);
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  randomUser(socket, io);
  messages(socket, io);
  usersOnline(socket, io);
  disconnectUser(socket, io);
});