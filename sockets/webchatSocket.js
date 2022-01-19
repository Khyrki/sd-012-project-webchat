const moment = require('moment');

const { createMessage } = require('../models/webchatModel'); 

const webchatUsers = [];
const date = moment().format('DD-MM-yyyy HH:mm:ss A');

module.exports = (io) => io.on('connection', async (socket) => {
  const connectedUser = { id: socket.id, nickname: socket.id.substring(0, 10) };
  webchatUsers.push(connectedUser);
  io.emit('onlineUsers', webchatUsers);
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    await createMessage(chatMessage, nickname, date);
    io.emit('message', `${date} ${nickname}: ${chatMessage} `);
  });
});