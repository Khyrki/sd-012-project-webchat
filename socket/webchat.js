const model = require('../models/chat/create');
const { dataFunc } = require('../helpers/date');

let arr = [];

const disconnection = (socket, io) => {
  socket.on('disconnect', () => {
    const newArr = arr.filter((id) => socket.id !== id.id);
    arr = newArr;
    io.emit('onlineUser', newArr);
  });
};

const onlineUser = (socket, io) => { 
  socket.on('onlineUser', (nick) => {
    arr.push({ nick, id: socket.id });
    io.emit('onlineUser', arr);
    socket.emit('onlineUser', arr);
  });
};

const newName = (socket, io) => {
  socket.on('newName', ({ rename: inputValue, users: oldNick }) => {
    const index = arr.findIndex((user) => user.nick === oldNick);
    console.log(arr[index]);
    arr[index].nick = inputValue;
    io.emit('onlineUser', arr);
    console.log(arr[index]);
  });
};

const createMessage = (socket, io) => {
  socket.on('message', (message) => {
    model(
      { message: message.chatMessage,
         nickname: message.nickname,
        timestamp: dataFunc(new Date()),
      },
    );
    io.emit('message', `${dataFunc(new Date())} - ${message.nickname}: ${message.chatMessage}`);
  });
};

const ioFunc = (io) => io.on('connection', (socket) => {
  onlineUser(socket, io);
  createMessage(socket, io);
  disconnection(socket, io);
  newName(socket, io);
});

module.exports = ioFunc;