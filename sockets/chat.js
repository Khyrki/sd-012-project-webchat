// const generator = require('nickname-generator');
const { format } = require('date-fns');

// let users = [];
// let ioUsers = [];
// const messagesArray = [];

// const nicknameGenerator = (id) => {
//   let nickname = generator.randomNickname({ locale: 'fr', separator: '-', suffixLength: 0 });

//   while (nickname.length < 16) {
//     nickname = generator.randomNickname({ locale: 'fr', separator: '-', suffixLength: 0 });
//     if (nickname.length > 16) {
//       nickname = nickname.slice(0, 16);
//     }
//   }

//   users.unshift({
//     id,
//     nickname,
//   });

//   ioUsers.push({ id, nickname });

//   const loginNotification = `Usuário ${nickname} se conectou.`;

//   return {
//     loginNotification,
//     nickname,
//   };
// };

// const disconnectUser = (socketId) => {
//   const { nickname } = users.find(({ id }) => id === socketId);

//   users = users.filter(({ id }) => id !== socketId);

//   const disconnect = `Usuário ${nickname} se desconectou`;

//   return disconnect;
// };

const createMessage = (io, socket, _id) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = format(new Date(), 'dd-MM-yyy HH:mm:ss');
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;
    // messagesArray.push({ chatMessage, id, nickname, timestamp });
    io.emit('message', message);
  });
};

// const disconnect = (io, socket, id) => {
//   socket.on('disconnect', () => {
//     // const disconnectNotification = disconnectUser(id);
//     disconnectUser(id);
//     // io.emit('systemMessage', disconnectNotification);
//     io.emit('nicknameList', users);
//   });
// };

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

// const updateNickname = (id, oldNickname, newNickname) => {
//   let indexOf = '';
//     users.find((item, index) => {
//       indexOf = index;
//       return item.id === id;
//     });
//     users[indexOf].nickname = newNickname;
//     const { nickname } = users[indexOf];

//     updateMessageNickname(id, newNickname);

//     const ioNotification = `${oldNickname} alterou seu apelido para ${nickname}`;
//     const socketNotification = `Você alterou seu apelido para ${nickname}`;

//     return {
//       nickname,
//       ioNotification,
//       socketNotification,
//     };
// };

// const nicknameManager = (io, socket, id) => {
//   const { nickname: oldNickname } = users.find(({ id: socketId }) => socketId === id);

//   socket.on('changeNick', (nick) => {
//     const { nickname } = updateNickname(id, oldNickname, nick);

//     // socket.broadcast.emit('systemMessage', ioNotification);
//     io.emit('nicknameList', users);
//     io.emit('message', messagesArray);
//     // socket.emit('systemMessage', socketNotification);
//     socket.emit('userName', nickname);
//   });
// };

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  
  // const { nickname } = nicknameGenerator(id);
  
  // io.emit('nicknameList', users);
  // socket.emit('nicknameList', users);
  // io.emit('message', messagesArray);
  // socket.broadcast.emit('systemMessage', loginNotification);
  // socket.emit('userName', nickname);
  // socket.emit('systemMessage', `Você se conectou como ${nickname}`);
  
  createMessage(io, socket, id);
  // disconnect(io, socket, id);
  // nicknameManager(io, socket, id);
});