const generator = require('nickname-generator');
const { format } = require('date-fns');

const { saveMessageHistory, messageHistory } = require('../models/index');

const socketUsers = [];

const usersArrayGenerator = (id, nickname) => {
  socketUsers.unshift({ id, nickname });
};

const nicknameGenerator = (id) => {
  let nickname = generator.randomNickname({ locale: 'fr', separator: '-', suffixLength: 0 });

  while (nickname.length !== 16) {
    nickname = generator.randomNickname({ locale: 'fr', separator: '-', suffixLength: 0 });
  }

  if (nickname.length > 16) {
    nickname.slice(0, 15);
  }
  nickname = nickname
    .replace(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  usersArrayGenerator(id, nickname);
  return nickname;
};

const createMessage = async (io, socket, _id) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = format(new Date(), 'dd-MM-yyy HH:mm:ss');
    const message = `${timestamp} - ${!nickname ? nicknameGenerator() : nickname}: ${chatMessage}`;
    await saveMessageHistory({ message: chatMessage, nickname, timestamp });
    io.emit('message', message);
  });
};

const findIndex = (id, array) => {
  let indexOf = '';
  array.forEach((item, index) => {
    if (item.id === id) indexOf = index;
  });
  return indexOf;
};

const updateUsersArray = (id, newNickname) => {
  const socketIndex = findIndex(id, socketUsers);
  socketUsers[socketIndex].nickname = newNickname;
};

const nicknameManager = (io, socket, id) => {
  socket.on('changeNick', (nick) => {
    updateUsersArray(id, nick);
    socket.emit('userName', nick);
    io.emit('onlineUsersList', socketUsers);
  });
};

const disconnectUser = (socketId) => {
  const indexOf = findIndex(socketId, socketUsers);
  socketUsers.splice(indexOf, 1);
};

const disconnect = (io, socket, id) => {
  socket.on('disconnect', () => {
    disconnectUser(id);
    io.emit('onlineUsersList', socketUsers);
  });
};

const pastMessages = async () => {
  try {
    const messagesArray = await messageHistory();
    if (!messagesArray) return [];

    const messagesToRender = messagesArray.map(({ message, nickname, timestamp }) =>
      `${timestamp} - ${nickname}: ${message}`);

    return messagesToRender;
  } catch (err) {
    console.log('Erro no chat.js');
    return err;
  }
};

module.exports = (io) => io.on('connection', async (socket) => {
  const { id } = socket;
  
  const nickname = nicknameGenerator(id);
  
  socket.emit('userName', nickname);
  io.emit('onlineUsersList', socketUsers);
  const renderPastMessages = await pastMessages();
  socket.emit('pastMessages', renderPastMessages);
  
  createMessage(io, socket, id);
  disconnect(io, socket, id);
  nicknameManager(io, socket, id);
});
