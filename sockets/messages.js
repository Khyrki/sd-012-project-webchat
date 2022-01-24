// const userModel = require('../models/userModel');
const messageModel = require('../models/messageModel');

function client(socket) {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const dateFormatted = new Date()
      .toISOString()
      .replace(/(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\.\d+Z/gm, '$3-$2-$1 $4:$5:$6');
    const messageFormatted = `${dateFormatted} - ${nickname} ${chatMessage}`;

    const messageDB = {
      timestamp: messageFormatted,
      nickname,
      chatMessage,
    };

    await messageModel.create(messageDB);

    socket.broadcast.send(messageFormatted);
    socket.send(messageFormatted);
  });
}

function server(io) {
  io.on('connection', client);
}

module.exports = server;
