const { format } = require('date-fns');

const createMessage = (socket, io) => {
  const { id } = socket;
  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  socket.on('message', async ({ nickname, chatMessage }) => {
    console.log(nickname, chatMessage);
    io.emit('message', `${timestamp} - ${!nickname ? id : nickname}: ${chatMessage}`);
    // await model.create({ nickname, chatMessage, timestamp });
    });
};

const messages = (io) => io.on('connection', (socket) => {
  // createUser(socket);
  createMessage(socket, io);
  // getMessages(socket);
  // saveNickname(socket, io);
  // usersOnline(socket, io);
  // disconnect(socket, io);
});
module.exports = messages;
