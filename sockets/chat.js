// código de formato de data adquirido no link: https://momentjs.com/

const moment = require('moment');

const messageModel = require('../models/messagesModel');

const onlineUsers = [];
const updateNickName = (io, socket) => {
  socket.on('updateNickName', (newNickName) => {
    onlineUsers.forEach((user, index) => {
      if (user.id === socket.id) {
        onlineUsers[index].nickname = newNickName;
      }
    });
    io.emit('connection', onlineUsers);
  });
};

const message = (io, socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateNow = moment().format('DD-MM-YYYY hh:mm:ss');
    
    const newMessage = `${dateNow} - ${nickname} - ${chatMessage}`;
    
    io.emit('message', newMessage); // transmite para todo mundo
    
    messageModel.create(chatMessage, nickname, dateNow);
  });
};

const disconnect = (io, socket) => {
  socket.on('disconnect', () => {
    onlineUsers.forEach((user, index) => {
      if (user.id === socket.id) { // para fazer o 
        onlineUsers.splice(index, 1);
      }
    });
    io.emit('connection', onlineUsers);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`O cliente ${socket.id} está conectado`);
    socket.emit('randomNickName', socket.id.substring(0, 16)); // nickname random
    const user = {
      nickname: socket.id.substring(0, 16),
      id: socket.id,
    };

    onlineUsers.push(user);
    io.emit('connection', onlineUsers);
    
    updateNickName(io, socket);
    message(io, socket);
    disconnect(io, socket);
  });
};
