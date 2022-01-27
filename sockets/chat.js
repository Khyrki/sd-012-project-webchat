const randomstring = require('randomstring');

const currentTimeStamp = require('../helpers/currentTimeStamp');
const { saveMessage, getAllMessages } = require('../models/message');

const users = {};

const onConnection = async (io, socket) => {
  console.log('onConnection');
  const randomNickname = randomstring.generate(16);
  socket.emit('getNickname', randomNickname);

  // get messages from db
  const allMessages = await getAllMessages();
  socket.emit('refreshMessages', allMessages);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log('conectado'); shows that we have connection - users are connected!
    // console.log(socket);
    onConnection(io, socket);

    socket.on('message', async (msg) => {
      // gets message from client and send it to all in right format
      const { chatMessage: message, nickname } = msg;
      const timestamp = currentTimeStamp();

      await saveMessage({ message, nickname, timestamp });

      const clientMessage = `${timestamp} - ${msg.nickname}: ${msg.chatMessage}`;
      io.emit('message', clientMessage);
    });
    
    socket.on('updateNickname', (nickname) => {
        // update nickname in the local user object
        users[socket.id] = nickname;
        console.log('updateNickname called', users);
        // sends updated nickname to all
        io.emit('updateUsers', users);
      });
  });
};
