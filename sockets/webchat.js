const create = require('../models/create');
const getAll = require('../models/getAll');

const dataFunc = (date) => {
  const mo = new Intl.DateTimeFormat('pt-br', { 
    dateStyle: 'short', 
    hour12: 'true', 
    timeStyle: 'medium',
  }).format(date);
  const correctDate = mo.split('/').join('-');
  return correctDate;
};

const actualDate = dataFunc(new Date());

const createMsgs = (socket, io) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    await create(chatMessage, nickname, actualDate);
    io.emit('message', `${actualDate} - ${nickname}: ${chatMessage}`);
  });
};

const getMessages = async (socket) => {
  const result = await getAll();

  socket.emit('getMessages', result);
};

const messages = (io) => io.on('connection', (socket) => {
  getMessages(socket);
  createMsgs(socket, io);
});

module.exports = messages;
