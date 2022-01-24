const userModel = require('../models/userModel');
const messageModel = require('../models/messageModel');

function client(socket) {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const dateFormatted = new Date().toLocaleString();
    const messageFormatted = `${dateFormatted} - ${nickname} ${chatMessage}`;

    // const user = await userModel.find(socket.id);
    // console.log(user);
    // const msg = await messageModel.create(chatMessage);
    // console.log(msg);

    socket.broadcast.send(messageFormatted);
    socket.send(messageFormatted);
  });
}

function server(io) {
  io.on('connection', client);
}

module.exports = server;
