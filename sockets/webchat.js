const moment = require('moment');
const chatModels = require('../models/chatModels');

let onlineUsers = [];

module.exports = (io) => {
  //* servidor escutando se algum cliente se conecta
  io.on('connection', (socket) => {
    onlineUsers.push({ id: socket.id, nickname: socket.id.slice(0, 16) });

    //* Emite para clientes a lista de usuários
    io.emit('onlineUsers', onlineUsers);

    //* servidor escutando se evento 'message' chega
    socket.on('message', async ({ chatMessage, nickname }) => {
      const date = moment().format('DD-MM-YYYY LTS');

      //* coloca no banco de dados a mensagem
      await chatModels.insertNewUser({ message: chatMessage, nickname, timestamp: date });
      
      //* emit para todos o evento 'message'
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });

    //* Servidor escuta evento 'onlineUsers'
    //* Muda nome do usuário na lista
    socket.on('onlineUsers', (newNickname) => {
      const index = onlineUsers.findIndex(({ id }) => id === newNickname.id);
      onlineUsers[index] = newNickname;

      //* Emite para clientes para renovar na lista
      io.emit('onlineUsers', onlineUsers);
    });

    //* Limpa lista deixando somente usuários online
    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter(({ id }) => id !== socket.id);
      io.emit('onlineUsers', onlineUsers);
    });
  });
};