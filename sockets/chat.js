const { format } = require('date-fns');
const create = require('../models/create');
const list = require('../models/list');

const createMessages = (socket, io) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;

    await create(chatMessage, nickname, timestamp);
    console.log(`Mensagen - ${nickname}: ${chatMessage}`);
    io.emit('message', message);
  });
};

const getMessages = async (socket) => {
  const result = await list();

  socket.emit('getMessages', result);
};

module.exports = (io) => io.on('connection', async (socket) => {
  socket.emit('nickname', `${socket.id.slice(0, 16)}`);

  createMessages(socket, io);
  getMessages(socket);
});
