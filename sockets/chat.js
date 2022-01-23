const { format } = require('date-fns');
const { randomName } = require('../randomNickName');
const { createMessagesHistory } = require('../models');

let userList = [];

const createMessageWithSocket = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const currentDate = new Date();
    const date = format(currentDate, 'dd-MM-yyyy HH:mm:ss');
    const message = `${date} - ${nickname}: ${chatMessage}`;
  
    io.emit('message', message);
    
    createMessagesHistory(chatMessage, nickname, date);
  });

  socket.on('disconnect', () => {
    userList = userList.filter(({ id }) => id !== socket.id);

    io.emit('connectedUsers', userList);
  });
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log(`${socket.id} connected`);

    const randomNickname = `${randomName()}`;

    userList.push({ id: socket.id, nickname: randomNickname });

    socket.emit('randomName', randomNickname);

    io.emit('connectedUsers', userList);

    socket.on('nickName', (nickName) => {
      userList.forEach((user, index) => {
        if (user.id === socket.id) {
          userList[index].nickname = nickName;
        }
      });
      
      io.emit('connectedUsers', userList);
      
      socket.emit('newNickName', nickName);
    });
    
    createMessageWithSocket(socket, io);
  });
};