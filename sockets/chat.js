const moment = require('moment');
const createMessage = require('../models/createMessage');

let userList = [];

const messagesChat = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:MM:SS A');

    const info = { message: chatMessage,
      nickname,
      timestamp,
    };
    
    await createMessage(info);
    
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });

  socket.on('newUser', (newUser) => {
    userList.push({ id: socket.id, nickname: newUser });
    io.emit('newUser', userList);
  });

  socket.on('updateNick', (newNick) => {
    userList = userList.filter((item) => item.id !== socket.id);
    userList.push({ id: socket.id, nickname: newNick });
    io.emit('newUser', userList);
  });
});

const userDisconnect = (io) => io.on('connection', async (socket) => {
  socket.on('disconnect', () => {
    userList = userList.filter((item) => item.id !== socket.id);
    
    io.emit('newUser', userList);
  });
});

module.exports = {
  messagesChat,
  userDisconnect,
};