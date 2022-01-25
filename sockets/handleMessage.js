const { getAll, create } = require('../models/Message');
const util = require('../util/helper');

module.exports = async (io, socket, _sessionStore) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const message = `${util.getTimeNow()} - ${nickname}: ${chatMessage}`;
    await create({ message: chatMessage, nickname, timestamp: util.getTimeNow() });
    io.emit('message', message);
  });
  socket.emit('history', await getAll());
};
