const moment = require('moment');

const { catchMessages, lockMessage } = require('../models/chatModel');

const date = moment().format('DD-MM-yyyy HH:mm:ss A');

const connect = async (socket) => {
  const messages = await catchMessages();
  socket.emit('loadMessages', messages);
};

module.exports = (io) => io.on('connection', (socket) => {
  connect(socket);
  console.log(`Usuário ${socket.id} acabou de se conectar`);
  
  socket.on('message', async ({ nickname, chatMessage }) => {
    const message = chatMessage;
    await lockMessage({ message, nickname, date });

    io.emit('message', 
    `${date} - ${nickname}: ${chatMessage}`);    
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} acabou de se desconectar`);
  });
});