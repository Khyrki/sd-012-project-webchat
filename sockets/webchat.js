const moment = require('moment');
const model = require('../models');

const onlineUsers = [];

const messageSocket = (io, socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    const userMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
    io.emit('message', userMessage);
    model.createMessage({ chatMessage, nickname, timestamp });
  });
};

