const { 
  formatMessage, removeSelectedUser, getAllMessages, saveMessage,
} = require('../models/message');

let userList = [];
let allMessagesBD = [];

const getMessages = async () => {
  allMessagesBD = await getAllMessages();
};

// Comment to push
const first = (io) => io.on('connection', async (socket) => {
  socket.emit('allMessages', allMessagesBD);

  socket.on('message', ({ chatMessage, nickname }) => {
    const resultMessage = formatMessage();
    saveMessage(nickname, chatMessage, resultMessage);
    allMessagesBD.push({ message: chatMessage, nickname, timestamp: resultMessage });
    io.emit('message', `${formatMessage()} - ${nickname}: ${chatMessage}`);
  });
  socket.on('newUser', (nickname) => {
    userList.push({ id: socket.id, nickname });
    io.emit('newUser', userList);
  });
  socket.on('changeNick', (newNick) => {
    userList = removeSelectedUser(socket.id, userList);
    userList.push({ id: socket.id, nickname: newNick });
    io.emit('newUser', userList);
  });
});

const second = (io) => io.on('connection', async (socket) => {
  socket.on('disconnect', () => {
    userList = removeSelectedUser(socket.id, userList);
    io.emit('newUser', userList);
  });
});

module.exports = {
  first,
  second,
  getMessages,
};
