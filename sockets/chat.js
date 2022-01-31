const { format } = require('date-fns');

const createMessage = async (socket, io) => {
  const { id } = socket;
  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${timestamp} - ${!nickname ? id : nickname}: ${chatMessage}`);
  });
};

const messages = (io) =>
  io.on('connection', (socket) => {
    createMessage(socket, io);
  });

module.exports = messages;
