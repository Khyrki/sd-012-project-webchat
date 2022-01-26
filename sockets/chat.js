const randomstring = require('randomstring');

const currentTimeStamp = require('../helpers/currentTimeStamp');

const users = {};

const onConnection = (io, socket) => {
  console.log('onConnection');
  const randomNickname = randomstring.generate(16);
  // users[socket.id] = randomNickname;
  socket.emit('getNickname', randomNickname);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log('conectado'); shows that we have connection - users are connected!
    // console.log(socket);
    onConnection(io, socket);

    socket.on('message', (msg) => {
    // gets message from client and send it to all in right format
      const timestamp = currentTimeStamp();
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
