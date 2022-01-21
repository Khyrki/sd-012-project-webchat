const moment = require('moment');

const users = [];

// recebe a msg do client, formata e devolve para ser appendada
const messages = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');
    const fotmatMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
    console.log(`Mensagem: ${fotmatMessage}`);
    io.emit('message', fotmatMessage);
  });
};

// gera usuário random assim que o client se conecta envia para createUser
const randomUser = (socket, io) => {
  const { id } = socket;
  console.log(`Usuário conectado ID: ${id}`);
  const formatUser = `Gost-${id.slice(9)}`;
  console.log(formatUser);
  users.push({ id, nickname: formatUser });
  io.emit('randomUser', formatUser);
};

// manda array de users para o cli appendar
const usersOnline = (socket, io) => {
  socket.on('usersOnCli', () => {
    io.emit('usersOnServ', users);
  });
};

// localiza cli desconectado, retira do array e envia p cli appendar
const userDisconnect = (socket, io) => {
  socket.on('disconnect', () => {
    const user = users.findIndex((u) => u.id === socket.id);
    users.splice(user, 1);
    io.emit('usersOnServ', users);
  });
};
// recebe value do inputNickname busca no array e altera nickname
const saveNickname = async (socket, io) => {
  socket.on('saveNickname', (nickname) => {
    const user = users.findIndex((u) => u.id === socket.id);
    users[user].nickname = nickname;
    io.emit('usersOnServ', users);
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  randomUser(socket, io);
  messages(socket, io);
  usersOnline(socket, io);
  userDisconnect(socket, io);
  saveNickname(socket, io);
});