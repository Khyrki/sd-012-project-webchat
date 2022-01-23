// moment usage ref: https://momentjs.com/docs/
const Moment = require('moment');
const { getAll, create } = require('../models/messagesModel');

const onMessage = async ({ chatMessage, nickname }, io) => {
  const date = Moment();
  const formatedDate = date.format('DD-MM-yyyy hh:mm:ss A');
  await create({
    message: chatMessage,
    nickname,
    timestamp: formatedDate,
  });
  io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
};

const serverCode = (io) => {
  io.on('connection', async (socket) => {
    let username = socket.id.slice(-16);
    const messages = await getAll();

    socket.on('message', (pkg) => onMessage(pkg, io));
    socket.on('introduceMeToNewUser', (name) => {
      socket.broadcast.emit('introduceUsersToNewUser', name);
    });
    socket.on('updateMyName', (newUsername) => {
      io.emit('updateNameForAll', { oldUsername: username, newUsername });
      username = newUsername;
    });
    socket.on('disconnect', () => io.emit('disconnectUser', username));
    
    socket.broadcast.emit('addNewUser', username);
    socket.emit('loadHistory', messages);
    socket.emit('userConnection', username);
  });
};

module.exports = serverCode;