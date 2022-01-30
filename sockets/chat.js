const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const { createMsgHistory } = require('../models');

// Biblioteca baixada e requisito 2 feito com a ajuda do colega Cristiano Lima!
const randomName = () => {
  const random = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  return random.substring(0, 16);
};

let usersList = [];

const messageSocket = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date();
    const dateMsg = `${date.getDate()}-0${date.getMonth() + 1}-${date
    .getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date
    .getSeconds()}`;
    io.emit('message', `${dateMsg} - ${nickname}: ${chatMessage}`);
    createMsgHistory(chatMessage, nickname, dateMsg);
  });
};

// Requisito 4 feito com a ajuda do colega Cristiano Lima e esclarecido com a ajuda do colega Bruno Augusto.
const disconnect = (socket, io) => {
  socket.on('disconnect', () => {
    usersList = usersList.filter((item) => item.id !== socket.id);
    io.emit('usuariosConectados', usersList);
  });
};
    
module.exports = (io) => {
  io.on('connection', (socket) => {
    const randomNickname = `${randomName()}`;
    usersList.push({ id: socket.id, nickname: randomNickname });
    socket.emit('nickname', randomNickname);
    io.emit('usuariosConectados', usersList);
    socket.on('nicknameList', (nickName) => {
    usersList.forEach((user, index) => {
      if (user.id === socket.id) {
        usersList[index].nickname = nickName;
      }
    });
    io.emit('usuariosConectados', usersList);
    socket.emit('newName', nickName);
  });
  messageSocket(socket, io);
  disconnect(socket, io);
  });
};