const { addMessage } = require('../models/servModel');

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('init', socket.id);
  console.log(`Usuário conectado. ID: ${socket.id} `);
  socket.on('message', ({ nickname, chatMessage }) => {
    const time = new Date().toLocaleString('es-CL', { timeZone: 'UTC' });
    const msg = `${time} ${nickname}: ${chatMessage}`;
    addMessage(chatMessage, nickname, time);
    console.log(msg);
    io.emit('message', msg);
  });
});