const util = require('../util/helper');
const { getAll, create } = require('../models/Message');

module.exports = (io) => io.on('connection', async (socket) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const message = `${util.getTimeNow()} - ${nickname}: ${chatMessage}`;
    await create({ message: chatMessage, nickname, timestamp: util.getTimeNow() });
    io.emit('message', message);
  });
  
  socket.emit('history', await getAll());

  socket.on('disconnect', () => {
    // socket.broadcast.emit('serverMessage', `${nickname} acabou de se desconectar!`);
  });
});
