const moment = require('moment');
const { createMessage } = require('../../models/chat');

module.exports = (io, socket) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const date = new Date();
    const currentDate = moment(date).format('DD-MM-YYYY HH:MM:SS A');
    await createMessage({ nickname, chatMessage, currentDate });
    io.emit('message', `${currentDate} ${nickname}: ${chatMessage}`);
  });
};