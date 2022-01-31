const moment = require('moment');
const { send } = require('../models');

const online = [];

const newUser = (socket, io) => {
  socket.on('new-user', (user) => {
    online.push({ id: socket.id, nickname: user });
    io.emit('online', online);
  });
};

const editUser = (socket, io) => {
  socket.on('edit-user', (user) => {
    const index = online.findIndex((item) => item.id === socket.id);
    online[index].nickname = user;
    io.emit('online', online);
  });
};

const offlineUser = (socket, io) => {
  socket.on('disconnect', () => {
    const index = online.findIndex((item) => item.id === socket.id);
    online.splice(index, 1);
    io.emit('online', online);
  });
};

const messageData = (socket, io) => {
  socket.on('message', async (message) => {
    const date = moment(new Date()).format('DD-MM-YYYY HH:MM:SS A'); //  https://momentjs.com/docs/#/use-it/node-js/
            
    const text = `${date}  - ${message.nickname}: ${message.chatMessage}`;

    await send({ 
      nickname: message.nickname,
      message: message.chatMessage,
      timestamp: date,
    });

    io.emit('message', text);
  });
};

const chat = (io) => {
    io.on('connection', (socket) => {  
        newUser(socket, io);
        editUser(socket, io);
        offlineUser(socket, io);
        messageData(socket, io);
    });
  };
  
  module.exports = chat; 
