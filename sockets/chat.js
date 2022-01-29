const { format } = require('date-fns');

const createMessage = (socket, io) => {
  const { id } = socket;
  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  socket.on('message', async ({ nickname, chatMessage }) => {
    io.emit('message', `${timestamp} - ${!nickname ? id : nickname}: ${chatMessage}`);
    // await model.create({ nickname, chatMessage, timestamp });
    });
};

const createToken = (socket) => {
  const nickname = [...Array(16)]
    .map((_i) => Math.floor(Math.random() * 36).toString(36))
    .join(''); 
  socket.emit('token', nickname);
};

const messages = (io) => io.on('connection', (socket) => {
  createMessage(socket, io);
  createToken(socket);
});
module.exports = messages;
