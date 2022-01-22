const { format } = require('date-fns');
const { randomName } = require('../randomNickName');
const { createMessagesHistory } = require('../models');

let userList = [];

const socketFunction = async (socket, io) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const currentDate = new Date();
    const date = format(currentDate, 'dd-MM-yyyy HH:mm:ss');
    const message = `${date} - ${nickname}: ${chatMessage}`;
  
    await createMessagesHistory(chatMessage, nickname, date);
  
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    userList = userList.filter(({ id }) => id !== socket.id);

    io.emit('connectedUsers', userList);
  });
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log(`${socket.id} connected`);
    const random = `${randomName()}`;
    userList.push({ id: socket.id, nickname: random });
    socket.emit('randomName', random);
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
    
    await socketFunction(socket, io);
  });
};