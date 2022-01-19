const { create } = require('../models/index');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Cliente conectado ${socket.id}`);

  io.emit('online');
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    const time = new Date();
    const timestamp = time.toLocaleString('es-CL', { timeZone: 'UTC' });
    const msg = `${timestamp} ${nickname} ${chatMessage}`;
    await create({ chatMessage, nickname, timestamp });
    io.emit('message', msg);
  });

  socket.on('newNickname', (newNickname) => {
    io.emit('new', newNickname);
  });
});