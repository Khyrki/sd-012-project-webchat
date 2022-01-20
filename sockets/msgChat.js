const moment = require('moment');
const chat = require('../models/chat');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timeInMs = moment().format('DD-MM-YYYY HH:MM:SS A');

    await chat.registerMessage({ message: chatMessage, nickname, timestamp: timeInMs });

    io.emit('message', `${timeInMs} : ${nickname} => ${chatMessage}`);
  });
});