const generator = require('nickname-generator');
const { format } = require('date-fns');

let users = [];

const nicknameGenerator = (id) => {
  let nickname = generator.randomNickname({ locale: 'fr', separator: '-', suffixLength: 0 });

  while (nickname.length < 16) {
    nickname = generator.randomNickname({ locale: 'fr', separator: '-', suffixLength: 0 });
  }

  users.unshift({
    id,
    nickname,
  });

  const loginNotification = `Usuário ${nickname} se conectou.`;

  return {
    loginNotification,
    nickname,
  };
};

const disconnectUser = (socketId) => {
  const { nickname } = users.find(({ id }) => id === socketId);

  users = users.filter(({ id }) => id !== socketId);

  const disconnect = `Usuário ${nickname} se desconectou`;

  return disconnect;
};

const createMessage = (io, socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = format(new Date(), 'dd-MM-yyy HH:mm:ss');
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
};

const disconnect = (io, socket) => {
  const { id } = socket;

  socket.on('disconnect', () => {
    const disconnectNotification = disconnectUser(id);
    io.emit('systemMessage', disconnectNotification);
    io.emit('nicknameList', users);
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  
  const { loginNotification, nickname } = nicknameGenerator(id);
  
  io.emit('nicknameList', users);
  socket.broadcast.emit('systemMessage', loginNotification);
  socket.emit('userName', nickname);
  socket.emit('systemMessage', `Você se conectou como ${nickname}`);
  
  createMessage(io, socket);
  disconnect(io, socket);
});