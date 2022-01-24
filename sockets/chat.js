const usersOnline = [];
const chatModel = require('../models/chatModel');

const newUser = (socket, io) => {
  socket.on('new-user', (user) => {
    usersOnline.push({ id: socket.id, nickname: user });
    console.log(usersOnline);
    io.emit('online', usersOnline);
  });
};

const editUser = (socket, io) => {
  socket.on('edit-user', (user) => {
    console.log(user);
    const indexUser = usersOnline.findIndex((item) => item.id === socket.id);
    usersOnline[indexUser].nickname = user;
    console.log(usersOnline);
    io.emit('online', usersOnline);
  });
};

const offlineUser = (socket, io) => {
  socket.on('disconnect', () => {
    console.log(`Um usuário desconectou de ${socket.id}`);
    const indexUser = usersOnline.findIndex((item) => item.id === socket.id);
    usersOnline.splice(indexUser, 1);
    io.emit('online', usersOnline);
  });
};

const messageVal = (socket, io) => {
  socket.on('message', async (message) => {
    const dateMessage = new Date();
    const timeMessage = dateMessage.toLocaleTimeString();
    const editedDateMessage = dateMessage.toLocaleDateString();
    const editedMessage = `${editedDateMessage} ${timeMessage}
    -${message.nickname}: ${message.chatMessage}`;

    await chatModel.sendMessage(
      { nickname: message.nickname,
        message: message.chatMessage,
        timestamp: `${editedDateMessage} ${timeMessage}` },
    );
    io.emit('message', editedMessage);
    console.log(dateMessage, timeMessage, editedDateMessage, editedMessage);
  });
};

const chat = async (io) => {
  io.on('connection', (socket) => {
    newUser(socket, io);
    editUser(socket, io);
    console.log(`Um usuário conectou em ${socket.id}`); 
    offlineUser(socket, io);
    messageVal(socket, io);
  });
};

module.exports = chat;