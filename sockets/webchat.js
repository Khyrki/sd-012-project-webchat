const create = require('../models/create');
const getAll = require('../models/getAll');

let arrUsers = [];

const dataFunc = (date) => {
  const mo = new Intl.DateTimeFormat('pt-br', { 
    dateStyle: 'short', 
    hour12: 'true', 
    timeStyle: 'medium',
  }).format(date);
  const correctDate = mo.split('/').join('-');
  return correctDate;
};

const actualDate = dataFunc(new Date());

const createMsgs = (socket, io) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    await create(chatMessage, nickname, actualDate);
    io.emit('message', `${actualDate} - ${nickname}: ${chatMessage}`);
  });
};

const getConnectedUser = (socket) => {
  const nickname = [...Array(16)]
  .map((_i) => Math.floor(Math.random() * 36).toString(36))
  .join('');
  
  arrUsers.push({ nickname, id: socket.id });
  socket.emit('connectedUser', nickname);
};

const onlineUsers = (io) => {
  io.emit('onlineUsers', arrUsers);
};

const renameNickname = (socket, io) => {
  socket.on('renameNickname', (nicknameUser) => {
    arrUsers.forEach((nickUser) => {
      const ref = nickUser;
      if (nickUser.id === socket.id) {
        ref.nickname = nicknameUser;
      }
    });

    io.emit('onlineUsers', arrUsers);
  });
};

const getMessages = async (socket) => {
  const result = await getAll();

  socket.emit('getMessages', result);
};

const disconnectUser = (socket, io) => {
  socket.on('disconnect', () => {
    arrUsers = arrUsers.filter((user) => user.id !== socket.id);

    io.emit('onlineUsers', arrUsers);
  });
};

const messages = (io) => io.on('connection', (socket) => {
  getMessages(socket);
  createMsgs(socket, io);
  getConnectedUser(socket);
  onlineUsers(io);
  renameNickname(socket, io);
  disconnectUser(socket, io);
});

module.exports = messages;
