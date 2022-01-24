const moment = require('moment');
const { getAllMessages, createNewMessage } = require('./models/messages');

module.exports = (io) => io.on('connection', async (socket) => {
  const allMessages = await getAllMessages();
  socket.emit('connection', allMessages);
  socket.emit('newUser');

  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-YYYY HH:MM:SS A');
    const message = `${date} - ${nickname}: ${chatMessage}`;
    await createNewMessage({ message: chatMessage, nickname, timestamp: date });

    io.emit('message', message);
  });

  socket.on('history', ({ chatMessage, nickname, timestamp }) => {
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;
    io.emit('clientMessage', message);
  });
});