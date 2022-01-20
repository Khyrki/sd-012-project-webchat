const moment = require('moment');
const { saveMsgs } = require('../helpers/api');

const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`${socket.id} se conectou!`);
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    await saveMsgs({ message: chatMessage, nickname, timestamp });

    io.emit('message', `${timestamp} ${nickname}: ${chatMessage}`);
  });
});