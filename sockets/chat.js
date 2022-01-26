const randomstring = require('randomstring');

const currentTimeStamp = require('../helpers/currentTimeStamp');

module.exports = (io) => {
  io.on('connection', (socket) => {
    //   console.log('conectado'); shows that we have connection - users are connected!
    // console.log(socket);
    socket.emit('nickname', randomstring.generate(16)); // emits nickname from the server to one socket connection
    
    socket.on('message', (msg) => {
    // gets message from client and send it to all in right format
      const timestamp = currentTimeStamp();
      const clientMessage = `${timestamp} - ${msg.nickname}: ${msg.chatMessage}`;
      io.emit('message', clientMessage);
    });
  });
};
