const moment = require('moment');
const { createMessage } = require('../../models/chat');

module.exports = (io, socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = new Date();
    const time = moment(date).format('DD-MM-YYYY HH:MM:SS A');
    await createMessage({ chatMessage, nickname, time });
    io.emit('message', `${time} ${nickname}: ${chatMessage}`);
  });
};