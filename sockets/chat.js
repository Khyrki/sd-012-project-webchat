const generator = require('nickname-generator');
const { format } = require('date-fns');

const socketUsers = [];
// const messagesArray = [];

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

const createMessage = (io, socket, _id) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = format(new Date(), 'dd-MM-yyy HH:mm:ss');
    const message = `${timestamp} - ${!nickname ? nicknameGenerator() : nickname}: ${chatMessage}`;
    // messagesArray.push({ chatMessage, id, nickname, timestamp });
    io.emit('message', message);
  });
};

// const updateMessageNickname = (id, newNickname) => {
//   // const indexArray = messagesArray.map((item, index) => {
//   //   if (item.id === id) return index;
//   // });
//   const indexArray = [];
//   messagesArray.forEach((item, index) => {
//     if (item.id === id) {
//       indexArray.push(index);
//     }
//   });
//   indexArray.forEach((index) => {
//     messagesArray[index].nickname = newNickname;
//   });
// };

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

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  
  const nickname = nicknameGenerator(id);
  
  socket.emit('userName', nickname);
  io.emit('onlineUsersList', socketUsers);
  
  createMessage(io, socket, id);
  disconnect(io, socket, id);
  nicknameManager(io, socket, id);
});
