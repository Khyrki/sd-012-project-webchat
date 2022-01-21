const moment = require('moment');
const { createMessage } = require('../../models/chat');

module.exports = (io, socket) => {
  socket.on('message', async ({ nickName, message }) => {
    const date = new Date();
    const currentDate = moment(date).format('DD-MM-YYYY HH:MM:SS A');
    await createMessage({ nickName, message, currentDate });
    io.emit('message', `${currentDate} ${nickName}: ${message}`);
  });
};