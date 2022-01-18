const messagesModel = require('../../models/messagesModel');

const currentlyTime = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  const dataAtual = `${dia}-${mes}-${ano}`;
  const horaAtual = data.toLocaleTimeString('pt-BR');

  return `${dataAtual} ${horaAtual}`;
};

const onlineUsers = [];

const serverReturnAfterLogin = (socket = null, _io = null, data = null) => {
const { nickname } = data;
onlineUsers.push({ socketId: socket.id, nickname });
socket.emit('login', { onlineUsers, socketId: socket.id });
  socket.broadcast.emit('otherUserConnected', onlineUsers);
  // io.emit('otherUserConnected', nickname);
};

const updateNickname = (socket = null, io = null, nickname = null) => {
    const userIndex = onlineUsers.findIndex((item) => item.socketId === socket.id);

    onlineUsers[userIndex] = { ...onlineUsers[userIndex], nickname };

    // socket.broadcast.emit('alterNickname', onlineUsers);
    io.emit('alterNickname', onlineUsers);
  };

  const messagesHandler = async (_socket = null, io = null, data = null) => {
    const timestamp = currentlyTime();

    const { nickname, chatMessage: message } = data;
    // const { nickname, message } = data;
    // const message = chatMessage;
    // try {
      await messagesModel.create({ timestamp, nickname, message });
      // await messagesModel.create({ timestamp, nickname, chatMessage });

      // io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
      io.emit('message', `${timestamp} - ${nickname}: ${message}`);
    // } catch (error) {
      // console.log(error);
    // }
  };

  const disconnectHandler = (socket = null, _io = null, _data = null) => {
    const userIndex = onlineUsers.findIndex((item) => item.socketId === socket.id);

    onlineUsers.splice(userIndex, 1);
    socket.broadcast.emit('otherUserDisconnected', onlineUsers);
    // socket.broadcast.emit('otherUserDisconnected', { onlineUsers });
  };

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('login', ({ nickname }) => {
      serverReturnAfterLogin(socket, io, { nickname });

    });

    socket.on('disconnect', () => {
      disconnectHandler(socket, io);
    });

    socket.on('alterNickname', (newNickName) => {
      updateNickname(socket, io, newNickName);
    });
  
    socket.on('message', async (data) => {
      // socket.on('message', async (data) => {
      // try {
       await messagesHandler(socket, io, data);
        // await messagesHandler(socket, io, data);
      // } catch (error) {
        // console.log(error);
      // }
    });
  });
};
