const generator = require('nickname-generator');

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

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  
  const { loginNotification, nickname } = nicknameGenerator(id);
  
  io.emit('nicknameList', users);
  socket.broadcast.emit('systemMessage', loginNotification);
  socket.emit('userName', nickname);
  socket.emit('systemMessage', `Você se conectou como ${nickname}`);
  
  socket.on('message', (message) => {
    io.emit('message', { chatMessage: message.chatMessage, nickname: message.nickname });
  });

  socket.on('disconnect', () => {
    const disconnectNotification = disconnectUser(id);
    io.emit('systemMessage', disconnectNotification);
    io.emit('nicknameList', users);
  });
});